"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const uploads_1 = require("../controllers/uploads");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const uploadRouter = (0, express_1.Router)();
exports.uploadRouter = uploadRouter;
uploadRouter.post("/", middlewares_1.validarArchivoSubir, uploads_1.cargarArchivo);
uploadRouter.put("/:coleccion/:id", [
    middlewares_1.validarArchivoSubir,
    (0, express_validator_1.check)("id", "El id debe ser  de mongo").isMongoId(),
    (0, express_validator_1.check)("coleccion").custom((c) => (0, helpers_1.coleccionesPermitidas)(c, ["usuarios", "productos"])),
    validar_campos_1.validarCampos,
], uploads_1.actualizarImagenCloudinary);
uploadRouter.get("/:coleccion/:id", [
    (0, express_validator_1.check)("id", "El id debe ser  de mongo").isMongoId(),
    (0, express_validator_1.check)("coleccion").custom((c) => (0, helpers_1.coleccionesPermitidas)(c, ["usuarios", "productos"])),
    validar_campos_1.validarCampos,
], uploads_1.mostrarImagen);
