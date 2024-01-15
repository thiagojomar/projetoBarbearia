import { Router, Request, Response } from "express";
import FuncionarioController from "../controllers/funcionario.controller";
//import { welcome } from "../controllers/home.controller";

class FuncionarioRoutes {
  router = Router();
  controller = new FuncionarioController();

  constructor() {
    this.intializeRoutes();
  }
  
  intializeRoutes() {

   //Create novo Funcionario
   this.router.post("/funcionario/cadastrar", this.controller.create);
   //Retornar os Funcionarios ja cadastrados
   this.router.get("/funcionarios/listar", this.controller.findAll);
   // Retorna um Funcionario especifico pelo seu id
   this.router.get("/funcionario/buscar/:id", this.controller.findOne);
   //Atualiza um Funcionario pelo seu id
   this.router.put("/funcionario/atualizar/:id", this.controller.update);
   // Deleta um Funcionario pelo seu id
   this.router.delete("/funcionario/delete/:id", this.controller.delete);

  }
}

export default new FuncionarioRoutes().router;