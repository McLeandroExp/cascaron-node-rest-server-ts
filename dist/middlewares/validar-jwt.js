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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({ msg: "no hay token en la peticion" });
    }
    try {
        const privateKey = process.env.SECRETORPRIVATEKEY;
        jsonwebtoken_1.default.verify(token, privateKey);
        const { uid } = jsonwebtoken_1.default.decode(token);
        req.uid = uid;
        const usuario = yield usuario_1.default.findById(uid);
        req.usuario = usuario;
        //que encuentre el usuario
        if (!usuario) {
            return res
                .status(401)
                .json({ msg: "token no valido - usuario no encontrado" });
        }
        //verificar si el uid tiene estado true
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            return res
                .status(401)
                .json({ msg: "token no valido - usuario con estado false" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ msg: "token no valido" });
    }
});
exports.validarJWT = validarJWT;
