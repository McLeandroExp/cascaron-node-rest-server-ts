"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSChema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
    },
});
exports.default = (0, mongoose_1.model)("Role", RoleSChema);
