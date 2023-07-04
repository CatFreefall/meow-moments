import { Request, Response } from "express";
import pool from "../db";
import { dataCommand } from "../queries/authQueries";

const getData = (req: Request, res: Response) => {
  pool.query(dataCommand, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

export {
  getData
};