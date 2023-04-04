"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, "El estado es obligatorio"],
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"],
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "La categoria es obligatoria"],
    },
    descripcion: {
        type: String,
    },
    img: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
});
ProductoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, estado } = _a, data = __rest(_a, ["__v", "estado"]);
    return data;
};
exports.default = (0, mongoose_1.model)("Producto", ProductoSchema);
