import { Router } from "express";
import { check } from "express-validator";
import { loginController } from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";
const authRouter = Router();
authRouter.post(
  "/login",
  [
    check("correo", "el correo es obligatorio").isEmail(),
    check("password", "contrasenia  obligatoria").not().isEmpty(),
    validarCampos,
  ],
  loginController
);
export { authRouter };
