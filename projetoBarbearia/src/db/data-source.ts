import { config, dialect } from "../config/db.config";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Item } from "../models/itens";
import { Pessoa } from "../models/pessoa";
import { Funcionario } from "../models/funcionario";
import { Agendamento } from "../models/agendamento";

export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [Item, Pessoa, Funcionario, Agendamento],
    synchronize: true,
    logging: false,
})
