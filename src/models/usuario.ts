import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "el correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "el password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "el rol es obligatorio"],
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};
export default model("Usuario", UsuarioSchema);
