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
exports.buscar = void 0;
const mongoose_1 = require("mongoose");
const usuario_1 = __importDefault(require("../models/usuario"));
const categoria_1 = __importDefault(require("../models/categoria"));
const producto_1 = __importDefault(require("../models/producto"));
const coleccionesPermitidas = ["usuarios", "categoria", "productos", "roles"];
const buscarUsuarios = (termino = "", res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoId) {
        const usuario = yield usuario_1.default.findById(termino);
        return res.json({ results: usuario ? [usuario] : [] });
    }
    const regexp = new RegExp(termino, "i");
    const usuarios = yield usuario_1.default.find({
        $or: [{ nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }],
    });
    res.json({ results: usuarios });
});
const buscarCategorias = (termino = "", res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoId) {
        const categoria = yield categoria_1.default.findById(termino);
        return res.json({ results: categoria ? [categoria] : [] });
    }
    const regexp = new RegExp(termino, "i");
    const categorias = yield categoria_1.default.find({ nombre: regexp, estado: true });
    res.json({ results: categorias });
});
const buscarProductos = (termino = "", res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoId) {
        const producto = yield producto_1.default.findById(termino).populate("categoria", "nombre");
        return res.json({ results: producto ? [producto] : [] });
    }
    const regexp = new RegExp(termino, "i");
    const productos = yield producto_1.default.find({
        nombre: regexp,
        estado: true,
    }).populate("categoria", "nombre");
    res.json({ results: productos });
});
const buscar = (req, res) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res
            .status(400)
            .json({ msg: `Las colecciones permitodas son ${coleccionesPermitidas}` });
    }
    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino, res);
            break;
        case "categoria":
            buscarCategorias(termino, res);
            break;
        case "productos":
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({ msg: "Busqueda no incluida" });
    }
};
exports.buscar = buscar;
