"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const productosRouter = (0, express_1.Router)();
exports.productosRouter = productosRouter;
//obtener todos los productos - publico
productosRouter.get("/", controllers_1.obtenerProductos);
productosRouter.get("/:id", [
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos,
], controllers_1.obtenerProducto);
//crear un producto - privado -cualquier persona con un token valido
productosRouter.post("/", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("categoria", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("categoria").custom(helpers_1.existeCategoriaPorId),
    middlewares_1.validarCampos,
], controllers_1.crearProducto);
//actualizar por id- privado - cualquiera con un token valido
productosRouter.put("/:id", [
    middlewares_1.validarJWT,
    // check("categoria", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos,
], controllers_1.actualizarProducto);
//borrar una categoria - admin
productosRouter.delete("/:id", [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRole,
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos,
], controllers_1.borrarProducto);
