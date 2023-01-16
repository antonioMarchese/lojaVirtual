import jwt from "jsonwebtoken";

const secret = "chaveJWT";

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiresIn: string) => {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn);
  },
};
