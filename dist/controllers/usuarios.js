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
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limite = 5, desde = 1 } = req.query;
    limite = Number(limite);
    desde = Number(desde);
    const query = { estado: true };
    if (limite && desde && desde >= 1) {
        desde -= 1;
        const [totalBDD, usuarios] = yield Promise.all([
            yield usuario_1.default.countDocuments(query),
            yield usuario_1.default.find(query).skip(desde).limit(limite),
        ]);
        res.json({ totalBDD, totalPeticion: limite, usuarios });
    }
    else {
        res.status(400).json({ msg: "Hubo un error en la peticion" });
    }
});
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new usuario_1.default({ nombre, correo, password, rol });
    //encriptar la contrasenia
    const salt = bcrypt_1.default.genSaltSync();
    usuario.password = bcrypt_1.default.hashSync(password, salt);
    //guardar en db
    yield usuario.save();
    res.status(201).json({ msg: "post api", usuario });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google, correo } = _a, resto = __rest(_a, ["_id", "password", "google", "correo"]);
    if (password) {
        const salt = bcrypt_1.default.genSaltSync();
        resto.password = bcrypt_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, resto);
    res.json(usuario);
});
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
});
exports.usuariosDelete = usuariosDelete;
