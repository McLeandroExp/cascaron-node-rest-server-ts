"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const usuariosGet = (req, res) => {
    const { q, nombre, api = "uwu" } = req.query;
    res.json({ msg: "get api - controlador", q, nombre, api });
};
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => {
    const body = req.body;
    res.status(201).json({ msg: "post api - controlador", body });
};
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.json({ msg: "put api - controlador", id });
};
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req, res) => {
    res.json({ msg: "delete api - controlador" });
};
exports.usuariosDelete = usuariosDelete;
