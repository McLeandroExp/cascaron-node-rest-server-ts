"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const categoriasRouter = (0, express_1.Router)();
exports.categoriasRouter = categoriasRouter;
//obtener todas las categorias - publico
categoriasRouter.get("/", controllers_1.obtenerCategorias);
//obtener una categoria por id - publico
//middleware personalizado para obtener id
categoriasRouter.get("/:id", [
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeCategoriaPorId),
    middlewares_1.validarCampos,
], controllers_1.obtenerCategoria);
//crear una categoria - privado -cualquier persona con un token valido
categoriasRouter.post("/", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    middlewares_1.validarCampos,
], controllers_1.crearCategoria);
//actualizar - privado - cualquiera con un token valido
categoriasRouter.put("/:id", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeCategoriaPorId),
    middlewares_1.validarCampos,
], controllers_1.actualizarCategoria);
//borrar una categoria - admin
categoriasRouter.delete("/:id", [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRole,
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeCategoriaPorId),
    middlewares_1.validarCampos,
], controllers_1.borrarCategoria);
