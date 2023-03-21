import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "../routes/usuarios";
class Server {
  app: Application;
  port: String | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    //middlewares
    this.middlewares();
    //rutas de mi aplicacion
    this.routes();
  }
  middlewares() {
    //directorio publico
    this.app.use(express.static("public"));
    //cors
    this.app.use(cors());
    //lectura y parseo del body
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/api/usuarios", userRouter);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor está escuchando en el puerto ${this.port}.`);
    });
  }
}
export { Server };
