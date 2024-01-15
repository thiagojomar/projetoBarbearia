import { Request, Response } from "express";
import { Agendamento } from "../models/agendamento";
import agendamentoRepository from "../repositories/agendamento.repository";
import { Item } from "../models/itens";
import itensRepository from "../repositories/itens.repository";

export default class AgendamentoController {
  async create(req: Request, res: Response) {
    if (!req.body.idAgendamento) {
      res.status(400).send({
        message: "Não pode ser vazio!"
      });
      return;
    }

    try {
      const agendamento: Agendamento = req.body;

      for (let i = 0; i < agendamento.itens.length; i++) {
        const itemTemp: Item | null = await itensRepository.retrieveById(agendamento.itens[i].id);
        if (itemTemp !== null) {
          agendamento.itens[i] = itemTemp;
        }
      }
      const savedAgendamento = await agendamentoRepository.save(agendamento);

      res.status(201).send(savedAgendamento);
    } catch (err) {
      res.status(500).send({
        message: "Erro ao tentar salvar um item."
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
    agendamento.idAgendamento = parseInt(req.params.id);

    try {
      await agendamentoRepository.update(agendamento);

      
    } catch (err) {
      res.status(500).send({
        message: `Error ao atualizar o Agendamento com id=${agendamento.idAgendamento}.`
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

  
}
