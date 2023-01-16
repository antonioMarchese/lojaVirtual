import jwt from "jsonwebtoken";

const secret = "chaveJWT";

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiresIn: string) => {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  },
};
