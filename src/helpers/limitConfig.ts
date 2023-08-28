import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const configGET = () => {
  const options: any = {
    windowMs: 1 * 60 * 1000,
    max: 30,
    headers: true,
    skip: (req: Request, res: Response): boolean | void => {
      if (
        req.headers["content-length"] &&
        Number(req.headers["content-length"]) > 240
      ) {
        res.status(413).send({
          status: 413,
          message: "El tamaño excede el límite permitido",
        });
        return true;
      }
    },
    handler: (_req: Request, res: Response): void => {
      res.status(429).send({
        status: 429,
        message: "ya se te acabaron las solicitudes",
      });
    },
  };

  return rateLimit(options);
};