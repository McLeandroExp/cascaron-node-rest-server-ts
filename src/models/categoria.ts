import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es obligatorio"],
  },
});
CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};
export default model("Categoria", CategoriaSchema);
