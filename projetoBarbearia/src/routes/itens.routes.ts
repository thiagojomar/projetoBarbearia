import { Router, Request, Response } from "express";
import ItensController from "../controllers/itens.controllers";

class ItensRoutes {
  router = Router();
  controller = new ItensController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {

    //Create novo Item
    this.router.post("/item/cadastrar", this.controller.create);
    //Retornar os Itens ja cadastrados0
    this.router.get("/itens/listar", this.controller.findAll);
    // Retorna um item especifico pelo seu id
    this.router.get("/item/buscar/:id", this.controller.findOne);
    //Atualiza um Item pelo seu id
    this.router.put("/item/atualizar/:id", this.controller.update);
    // Deleta um Item pelo seu id
    this.router.delete("/item/delete/:id", this.controller.delete);

  }
}

export default new ItensRoutes().router;