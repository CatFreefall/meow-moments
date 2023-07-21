import { Request, Response } from "express";

import { validToken, getAccessToken } from "../../utils/authUtils";
import { Secret } from "jsonwebtoken";

const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret;
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

const verifyCookies = async (req: Request, res: Response): Promise<void> => {
  const { access_token, refresh_token, user } = req.cookies;
  const hasValidTokens = req.headers.cookie !== undefined ? true : false;

  // no cookies signifies that the user is not logged in.
  if (!hasValidTokens) {
    res.status(401).send("not logged in (no cookies)");
  } else {
    if (validToken(access_token, accessTokenSecret)) {
      res.status(200).send("valid refresh and access token");
    } else {
      // invalid access token, but valid refresh token clears the existing access
      // token and sends a newly generated one back to the client.
      if (validToken(refresh_token, refreshTokenSecret)) {
        res.clearCookie("access_token", { sameSite: "strict" });

        const payload: object = {
          username: user,
        };
        const newAccessToken = getAccessToken(payload);
        res.setHeader(
          "set-Cookie",
          `access_token=${newAccessToken}; HttpOnly; Secure; SameSite=Strict`
        );
        res
          .status(200)
          .send(
            "invalid access token, but valid refresh token. Access token refreshed."
          );
      }
      // invalid refresh token clears all cookies
      else {
        res.clearCookie("refresh_token", { sameSite: "strict" });
        res.clearCookie("access_token", { sameSite: "strict" });
        res.clearCookie("user", { sameSite: "lax" });
        res.status(401).send("invalid refresh token and access token");
      }
    }
  }
};

export { verifyCookies };
