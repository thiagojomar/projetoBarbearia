import { Request, Response } from "express";
import { Agendamento } from "../models/agendamento";
import agendamentoRepository from "../repositories/agendamento.repository";
import { Itens } from "../models/itens";
import itensRepository from "../repositories/itens.repository";

export default class AgendamentoController {
    async create(req: Request, res: Response) {
        if (!req.body.title) {
            res.status(400).send({
                message: "Não pode ser vazio!"
            });
            return;
        }

        try {
            const agendamento: Agendamento = req.body;
            agendamento.detalhamento.forEach(element => {
              const itemTemp: Itens | null = await itensRepository.retrieveById(element.id);
              if(itemTemp !== null){
                element = itemTemp;
              }
            });     
                          
            

            const savedAgendamento = await agendamentoRepository.save(agendamento);

            res.status(201).send(savedAgendamento);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar um genero"
            });
        }
    }

    async findAll(req: Request, res: Response) {
           
        try {
          const agendamentos = await agendamentoRepository.retrieveAll();
    
          res.status(200).send(agendamentos);
        } catch (err) {
          res.status(500).send({
            message: "Some error occurred while retrieving tutorials."
          });
        }
      }

      async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
    
        try {
          const agendamento = await agendamentoRepository.retrieveById(id);
    
          if (agendamento) res.status(200).send(agendamento);
          else
            res.status(404).send({
              message: `Não foi encontrado nenhum Agendamento com esse id=${id}.`
            });
        } catch (err) {
          res.status(500).send({
            message: `Error não foi possivel retornar nenhum Agendamento com id=${id}.`
          });
        }
      }
    
      async update(req: Request, res: Response) {
        let agendamento: Agendamento = req.body;
        agendamento.id = parseInt(req.params.id);
    
        try {
          const num = await agendamentoRepository.update(agendamento);
    
          if (num == 1) {
            res.send({
              message: "Agendamento foi atualizado com sucesso."
            });
          } else {
            res.send({
              message: `Não foi possivel atualizar o Agendamento com id=${agendamento.id}. Talvez o Agendamento não foi encontrado ou está vazio.`
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `Error ao atualizar o Agendamento com id=${agendamento.id}.`
          });
        }
      }
    
      async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
    
        try {
          const num = await agendamentoRepository.delete(id);
    
          if (num == 1) {
            res.send({
              message: "Agendamento deletado com sucesso!"
            });
          } else {
            res.send({
              message: `Não foi possível deletar o Agendamento com id=${id}. Talvez o Agendamento não tenha sido encontrado.`,
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `O Agendamento com id==${id}, não pode ser deletado.`
          });
        }
      }

      async deleteAll(req: Request, res: Response) {
        try {
          const num = await agendamentoRepository.deleteAll();
    
          res.send({ message: `${num} Agendamento foram deletados com sucesso!` });
        } catch (err) {
          res.status(500).send({
            message: "Algum erro ocorreu enquato deletava todos os Agendamentos."
          });
        }
      }
}
