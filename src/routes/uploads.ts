import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import {
  // actualizarImagen,
  actualizarImagenCloudinary,
  cargarArchivo,
  mostrarImagen,
} from "../controllers/uploads";
import { coleccionesPermitidas } from "../helpers";
import { validarArchivoSubir } from "../middlewares";
const uploadRouter = Router();

uploadRouter.post("/", validarArchivoSubir, cargarArchivo);

uploadRouter.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe ser  de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);

uploadRouter.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser  de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);
export { uploadRouter };
