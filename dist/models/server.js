"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = require("../routes/usuarios");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }
    middlewares() {
        //directorio publico
        this.app.use(express_1.default.static("public"));
        //cors
        this.app.use((0, cors_1.default)());
        //lectura y parseo del body
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/api/usuarios", usuarios_1.userRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor está escuchando en el puerto ${this.port}.`);
        });
    }
}
exports.Server = Server;
