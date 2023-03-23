"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const usuarios_1 = require("../controllers/usuarios");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/", usuarios_1.usuariosGet);
userRouter.put("/:id", [
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)("rol").custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosPut);
userRouter.post("/", [
    (0, express_validator_1.check)("nombre", "el nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "el password es obligatorio y debe tener mas de 6 letras").isLength({ min: 6 }),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    (0, express_validator_1.check)("correo", "el correo no es valido").isEmail(),
    (0, express_validator_1.check)("correo", "el correo no debe repetirse").custom(db_validators_1.emailExiste),
    (0, express_validator_1.check)("rol").custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosPost);
userRouter.delete("/:id", [
    (0, express_validator_1.check)("id", "no es un id valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosDelete);
