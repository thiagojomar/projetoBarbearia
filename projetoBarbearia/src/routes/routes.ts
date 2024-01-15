import { Application } from "express";
import homeRoutes from "./home.routes";
import itensRoutes from "./itens.routes";
import funcionarioRoutes from "./funcionario.routes";
import pessoaRoutes from "./pessoa.routes";
//import agendamentoRoutes from "./agendamento.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/RevivalBarbershop", homeRoutes);
    app.use("/RevivalBarbershop", itensRoutes);
    app.use("/Revivalbarbershop", funcionarioRoutes);
    app.use("/Revivalbarbershop", pessoaRoutes);
   // app.use("/Revivalbarbershop", agendamentoRoutes);
  }
}