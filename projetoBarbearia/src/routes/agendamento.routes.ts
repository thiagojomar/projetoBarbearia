import { Router, Request, Response } from "express";
import AgendamentoController from "../controllers/agendamento.controller";
//import { welcome } from "../controllers/home.controller";

class AgendamentoRoutes {
  router = Router();
  controller = new AgendamentoController();

  constructor() {
    this.intializeRoutes();
  }
  
  intializeRoutes() {

 //Create novo agendamento
 this.router.post("/agendamento/cadastrar", this.controller.create);
 //Retornar os agendamentos ja cadastrados
 this.router.get("/agendamentos/listar", this.controller.findAll);
 // Retorna um agendamento especifico pelo seu id
 this.router.get("/agendamento/buscar/:id", this.controller.findOne);
 //Atualiza um agendamento pelo seu id
 this.router.put("/agendamento/atualizar/:id", this.controller.update);
 // Deleta um agendamento pelo seu id
 this.router.delete("/agendamento/delete/:id", this.controller.delete);

  }
}

export default new AgendamentoRoutes().router; 