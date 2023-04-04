import path from "path";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import { v2 } from "cloudinary";
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { subirArchivo } from "../helpers";
import Usuario from "../models/usuario";
import Producto from "../models/producto";

const cargarArchivo = async (req: Request, res: Response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({
      nombre,
    });
  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `NO existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `NO existe un producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "algo salio mal xdnt" });
  }
  try {
    if (modelo.img) {
      //hay que borrar la imagen del servidor
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
  } catch (error) {}
  //limpiar imagenes previas

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();
  res.json(modelo);
};
const actualizarImagenCloudinary = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `NO existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `NO existe un producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "algo salio mal xdnt" });
  }
  //limpiar imagenes previas
  if (modelo.img) {
    const publicId = modelo.img.split("/").pop()?.split(".").shift();
    v2.uploader.destroy(publicId!);
  }
  if (!Array.isArray(req.files!.archivo)) {
    try {
      const { tempFilePath } = req.files!.archivo;
      const { secure_url } = await v2.uploader.upload(tempFilePath);
      modelo.img = secure_url;
      await modelo.save();
      res.json(modelo);
    } catch (err) {
      res.json(err);
    }
  }
};

const mostrarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `NO existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `NO existe un producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "algo salio mal xdnt" });
  }
  if (modelo.img) {
    //hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  const pathNotfound = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(pathNotfound);
};
export {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};
