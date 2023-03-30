"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const buscarRouter = (0, express_1.Router)();
exports.buscarRouter = buscarRouter;
buscarRouter.get("/:coleccion/:termino", controllers_1.buscar);
