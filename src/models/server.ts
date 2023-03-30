import express, { Application } from "express";
import cors from "cors";
import { dbConnection } from "../database/config";
import {
  userRouter,
  authRouter,
  categoriasRouter,
  productosRouter,
  buscarRouter,
} from "../routes";
class Server {
  app: Application;
  port: String | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    //conectar a base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    //rutas de mi aplicacion
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
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
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/usuarios", userRouter);
    this.app.use("/api/categorias", categoriasRouter);
    this.app.use("/api/productos", productosRouter);
    this.app.use("/api/buscar", buscarRouter);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`El servidor está escuchando en el puerto ${this.port}.`);
    });
  }
}
export { Server };
