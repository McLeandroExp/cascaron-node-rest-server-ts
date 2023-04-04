"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarImagenCloudinary = exports.mostrarImagen = exports.actualizarImagen = exports.cargarArchivo = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const helpers_1 = require("../helpers");
const usuario_1 = __importDefault(require("../models/usuario"));
const producto_1 = __importDefault(require("../models/producto"));
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nombre = yield (0, helpers_1.subirArchivo)(req.files, undefined, "imgs");
        res.json({
            nombre,
        });
    }
    catch (msg) {
        console.log(msg);
        res.status(400).json({ msg });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: `NO existe un usuario con el id ${id}` });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
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
            const pathImagen = path_1.default.join(__dirname, "../uploads", coleccion, modelo.img);
            if (fs_1.default.existsSync(pathImagen)) {
                fs_1.default.unlinkSync(pathImagen);
            }
        }
    }
    catch (error) { }
    //limpiar imagenes previas
    const nombre = yield (0, helpers_1.subirArchivo)(req.files, undefined, coleccion);
    modelo.img = nombre;
    yield modelo.save();
    res.json(modelo);
});
exports.actualizarImagen = actualizarImagen;
const actualizarImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: `NO existe un usuario con el id ${id}` });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
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
        const publicId = (_a = modelo.img.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".").shift();
        cloudinary_1.v2.uploader.destroy(publicId);
    }
    if (!Array.isArray(req.files.archivo)) {
        try {
            const { tempFilePath } = req.files.archivo;
            const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath);
            modelo.img = secure_url;
            yield modelo.save();
            res.json(modelo);
        }
        catch (err) {
            res.json(err);
        }
    }
});
exports.actualizarImagenCloudinary = actualizarImagenCloudinary;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = yield usuario_1.default.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: `NO existe un usuario con el id ${id}` });
            }
            break;
        case "productos":
            modelo = yield producto_1.default.findById(id);
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
        const pathImagen = path_1.default.join(__dirname, "../uploads", coleccion, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathNotfound = path_1.default.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathNotfound);
});
exports.mostrarImagen = mostrarImagen;
