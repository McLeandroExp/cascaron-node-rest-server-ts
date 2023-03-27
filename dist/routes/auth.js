"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/login", [
    (0, express_validator_1.check)("correo", "el correo es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "contrasenia  obligatoria").not().isEmpty(),
    validar_campos_1.validarCampos,
], auth_1.loginController);
