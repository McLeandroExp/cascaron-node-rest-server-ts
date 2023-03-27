import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/generar-jwt";
const loginController = async (req: Request, res: Response) => {
  const { correo, password } = req.body;
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario / password no son correctos -correo" });
    }
    //si el usuario esta activo en bdd
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario / password no son correctos -estado:false" });
    }

    //verificar la contrasenia
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario / password no son correctos - password" });
    }
    //generar jwt
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "algo salio mal :(" });
  }
};
export { loginController };
