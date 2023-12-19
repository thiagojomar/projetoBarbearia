import { Router, Request, Response } from "express";
//import { welcome } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req: Request, res: Response) => { return res.status(200).json("Olá mundo!") });
    this.router.get("/att", (req: Request, res: Response) => { return res.status(200).json("Agende o seu atendimento!") });
  }
}

export default new HomeRoutes().router;