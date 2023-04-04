import path from "path";
import { v4 as uuidv4 } from "uuid";

const subirArchivo = (
  files: any,
  extensionesValidas = ["png", "jpg", "jpeg"],
  carpeta = ""
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    if (!Array.isArray(archivo)) {
      const nombreCortado = archivo.name.split(".");
      const extension = nombreCortado[nombreCortado.length - 1];

      if (!extensionesValidas.includes(extension)) {
        return reject(
          `La extension ${extension} no es permitida, ${extensionesValidas}`
        );
      }

      const nombrefinal = uuidv4() + "." + extension;
      const uploadPath = path.join(
        __dirname,
        "../uploads/",
        carpeta,
        nombrefinal
      );
      archivo.mv(uploadPath, function (err: Error) {
        if (err) {
          reject(err);
        }
        resolve(nombrefinal);
      });
    }
  });
};
export { subirArchivo };
