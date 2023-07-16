import { Request, Response } from "express";

import { validToken, getAccessToken } from "../../utils/authUtils";
import { Secret } from "jsonwebtoken";

const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret;
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

const verifyCookies = async (req: Request, res: Response): Promise<boolean> => {
  const { access_token, refresh_token, user } = req.cookies;
  const hasValidTokens = req.headers.cookie !== undefined ? true : false;

  if (!hasValidTokens) {
    return false;
  } else {
    if (validToken(access_token, accessTokenSecret)) {
      return true;
    } else {
      if (validToken(refresh_token, refreshTokenSecret)) {
        res.clearCookie("access_token", { sameSite: "strict" });
        const newAccessToken = getAccessToken(user);
        res.setHeader(
          "set-Cookie",
          `access_token=${newAccessToken}; HttpOnly; Secure; SameSite=Strict`
        );
        return false;
      } else {
        res.clearCookie("refresh_token", { sameSite: "strict" });
        res.clearCookie("access_token", { sameSite: "strict" });
        res.clearCookie("user", { sameSite: "lax" });
        return false;
      }
    }
  }
};

export { verifyCookies };
