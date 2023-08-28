import { SignJWT, jwtVerify } from "jose";
import Connection from "../db/Connection";
import { Db, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

class TokenConfig {
  private db: Db;

  constructor() {
    this.db = new Connection().getDatabase();
  }

  async crearToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: "Datos no enviados" });
      return;
    }

    const result = await this.db.collection("usuario").findOne(req.body);

    if (!result) {
      res.status(401).send({ message: "Usuario no encontrado" });
      return;
    }

    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("3h")
      .sign(encoder.encode(process.env.JWT_SECRET));

    req.data = { status: 200, message: jwtConstructor };
    next();
  }

  async validarToken(req: Request, token: any): Promise<any> {
    try {
      const encoder = new TextEncoder();
      const jwtData = await jwtVerify(
        token,
        encoder.encode(process.env.JWT_SECRET)
      );

      const usuarioData = await this.db.collection("usuario").findOne({
        _id: new ObjectId(jwtData.payload.id),
        [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`,
      });

      if (!usuarioData) {
        throw new Error("Usuario no válido para este token");
      }

      const { _id, permisos, ...usuario } = usuarioData;
      return usuario;
    } catch (error:any) {
      console.error("Error al validar el token:", error.message);
      return null;
    }
  }
}

export default TokenConfig;
