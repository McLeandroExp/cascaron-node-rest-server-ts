import { Router } from "express";
import {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} from "../controllers/usuarios";
const userRouter = Router();
userRouter.get("/", usuariosGet);
userRouter.put("/:id", usuariosPut);
userRouter.post("/", usuariosPost);
userRouter.delete("/", usuariosDelete);
export { userRouter };
