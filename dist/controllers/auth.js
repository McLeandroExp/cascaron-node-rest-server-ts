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
exports.googleSignIn = exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const helpers_1 = require("../helpers");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        //verificar si el email existe
        const usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            return res
                .status(400)
                .json({ msg: "Usuario / password no son correctos -correo" });
        }
        //si el usuario esta activo en bdd
        if (!usuario.estado) {
            return res
                .status(400)
                .json({ msg: "Usuario / password no son correctos -estado:false" });
        }
        //verificar la contrasenia
        const validPassword = bcrypt_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ msg: "Usuario / password no son correctos - password" });
        }
        //generar jwt
        const token = yield (0, helpers_1.generarJWT)(usuario.id);
        res.json({ usuario, token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "algo salio mal :(" });
    }
});
exports.loginController = loginController;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = yield (0, helpers_1.googleVerify)(id_token);
        let usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ":x",
                img,
                google: true,
                rol: "USER_ROLE",
            };
            usuario = new usuario_1.default(data);
            yield usuario.save();
        }
        //si el usuario en db
        if (!usuario.estado) {
            return res.status(401).json({ ok: false, msg: "Usuario bloqueado" });
        }
        const token = yield (0, helpers_1.generarJWT)(usuario.id);
        res.json({ ok: true, usuario, token });
    }
    catch (error) {
        console.warn(error);
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar",
        });
    }
});
exports.googleSignIn = googleSignIn;
