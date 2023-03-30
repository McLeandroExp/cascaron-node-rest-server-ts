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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarProducto = exports.actualizarProducto = exports.obtenerProducto = exports.obtenerProductos = exports.crearProducto = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limite = 5, desde = 1 } = req.query;
    limite = Number(limite);
    desde = Number(desde);
    const query = { estado: true };
    if (limite && desde && desde >= 1) {
        desde -= 1;
        const [totalBDD, productos] = yield Promise.all([
            yield producto_1.default.countDocuments(query),
            yield producto_1.default.find(query)
                .populate("usuario", "nombre")
                .populate("categoria", "nombre")
                .skip(desde)
                .limit(limite),
        ]);
        res.json({ totalBDD, totalPeticion: limite, productos });
    }
    else {
        res.status(400).json({ msg: "Hubo un error en la peticion" });
    }
});
exports.obtenerProductos = obtenerProductos;
const obtenerProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findById(id)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre");
    res.json({ ok: true, producto });
});
exports.obtenerProducto = obtenerProducto;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _a = req.body, { estado, usuario, nombre } = _a, body = __rest(_a, ["estado", "usuario", "nombre"]);
    nombre = nombre.toLocaleUpperCase();
    const productoDB = yield producto_1.default.findOne({ nombre });
    if (productoDB) {
        return res
            .status(400)
            .json({ ok: false, msg: `El producto ${productoDB.nombre} ya existe` });
    }
    const data = Object.assign({ nombre, usuario: req.usuario._id }, body);
    const producto = new producto_1.default(data);
    yield producto.save();
    res.status(201).json(producto);
});
exports.crearProducto = crearProducto;
//actualizarProducto
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let _b = req.body, { estado, usuario } = _b, data = __rest(_b, ["estado", "usuario"]);
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    const producto = yield producto_1.default.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
});
exports.actualizarProducto = actualizarProducto;
//borrarCategoria {estado:false}
const borrarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productoBorrado = yield producto_1.default.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);
});
exports.borrarProducto = borrarProducto;
