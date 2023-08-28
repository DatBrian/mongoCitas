import passport, { DoneCallback } from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import TokenConfig from "./tokenConfig";
import { Request } from "express";

passport.use(
  new BearerStrategy({ passReqToCallback: true }, async function (
    req:Request,
    token:any,
    done:DoneCallback
  ) {
    const usuario = await new TokenConfig().validarToken(req, token);
    if (!usuario) return done(null, false);
    return done(null, usuario);
  })
);
export default passport;
