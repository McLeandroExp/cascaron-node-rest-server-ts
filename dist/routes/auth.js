"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const validar_campos_1 = require("../middlewares/validar-campos");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/login", [
    (0, express_validator_1.check)("correo", "el correo es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "contrasenia  obligatoria").not().isEmpty(),
    validar_campos_1.validarCampos,
], controllers_1.loginController);
authRouter.post("/google", [(0, express_validator_1.check)("id_token", "id_token es necesario").not().isEmpty(), validar_campos_1.validarCampos], controllers_1.googleSignIn);
