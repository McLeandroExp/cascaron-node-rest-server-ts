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
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = require("process");
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process_1.env.MONGODB_CNN) {
            yield mongoose_1.default.connect(process_1.env.MONGODB_CNN);
            console.log("estamos en linea bdd");
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Error en la coneccion de base de datos");
    }
});
exports.dbConnection = dbConnection;
