"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("../routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        //conectar a base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        //directorio publico
        this.app.use(express_1.default.static("public"));
        //cors
        this.app.use((0, cors_1.default)());
        //lectura y parseo del body
        this.app.use(express_1.default.json());
        //fileupload - carga de archivos
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use("/api/auth", routes_1.authRouter);
        this.app.use("/api/usuarios", routes_1.userRouter);
        this.app.use("/api/categorias", routes_1.categoriasRouter);
        this.app.use("/api/productos", routes_1.productosRouter);
        this.app.use("/api/buscar", routes_1.buscarRouter);
        this.app.use("/api/uploads", routes_1.uploadRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor está escuchando en el puerto ${this.port}.`);
        });
    }
}
exports.Server = Server;
