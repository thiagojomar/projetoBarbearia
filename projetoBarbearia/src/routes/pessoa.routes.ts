import { Router, Request, Response } from "express";
import PessoaController from "../controllers/pessoa.controller";
//import { welcome } from "../controllers/home.controller";

class PessoaRoutes {
  router = Router();
  controller = new PessoaController(); 

  constructor() {
    this.intializeRoutes();
  }
  
  intializeRoutes() {

    //Create nova Pessoa
    this.router.post("/pessoa/cadastrar", this.controller.create);
    //Retornar os Pessoas ja cadastrados
    this.router.get("/pessoas/listar", this.controller.findAll);
    // Retorna uma Pessoa especifico pelo seu id
    this.router.get("/pessoa/buscar/:id", this.controller.findOne);
    //Atualiza uma Pessoa pelo seu id
    this.router.put("/pessoa/atualizar/:id", this.controller.update);
    // Deleta uma Pessoa pelo seu id
    this.router.delete("/pessoa/delete/:id", this.controller.delete);
    // Deleta todas as Pessoas
    this.router.delete("/pessoas/deleteall", this.controller.deleteAll);
  }
}

export default new PessoaRoutes().router;