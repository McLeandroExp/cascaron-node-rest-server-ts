"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
const esAdminRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token primero",
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({ msg: `${nombre} no es administrador` });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token primero",
            });
        }
        const estaIncluido = roles.includes(req.usuario.rol);
        if (!estaIncluido) {
            res.status(401).json({
                msg: `${req.usuario.nombre} no tiene los permisos para dicha operacion`,
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
