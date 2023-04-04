"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const subirArchivo = (files, extensionesValidas = ["png", "jpg", "jpeg"], carpeta = "") => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        if (!Array.isArray(archivo)) {
            const nombreCortado = archivo.name.split(".");
            const extension = nombreCortado[nombreCortado.length - 1];
            if (!extensionesValidas.includes(extension)) {
                return reject(`La extension ${extension} no es permitida, ${extensionesValidas}`);
            }
            const nombrefinal = (0, uuid_1.v4)() + "." + extension;
            const uploadPath = path_1.default.join(__dirname, "../uploads/", carpeta, nombrefinal);
            archivo.mv(uploadPath, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(nombrefinal);
            });
        }
    });
};
exports.subirArchivo = subirArchivo;
