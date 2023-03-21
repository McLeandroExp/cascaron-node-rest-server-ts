import { Request, Response } from "express";

const usuariosGet = (req: Request, res: Response) => {
  const { q, nombre, api = "uwu" } = req.query;
  res.json({ msg: "get api - controlador", q, nombre, api });
};
const usuariosPost = (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json({ msg: "post api - controlador", body });
};
const usuariosPut = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: "put api - controlador", id });
};
const usuariosDelete = (req: Request, res: Response) => {
  res.json({ msg: "delete api - controlador" });
};
export { usuariosGet, usuariosPost, usuariosPut, usuariosDelete };
