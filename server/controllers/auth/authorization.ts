import { Request, Response } from "express";

const verifyCookies = async (req: Request, res: Response): Promise<boolean> => {
  console.log(req.headers.cookie);
  req.headers.cookie === undefined ? true : false;
  return false;

  // const { access_token, refresh_token, user } = req.cookies;
  // console.log(access_token, refresh_token, user);
};

export { verifyCookies };
