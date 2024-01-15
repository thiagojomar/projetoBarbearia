import { Item } from "../models/itens";
import { Request, Response } from "express";
import itensRepository from "../repositories/itens.repository";

export default class ItensController {

  async create(req: Request, res: Response) {
    if (!req.body.nome) {
      res.status(400).send({
        message: "Não pode ser vazio!"
      });
      return;
    }

    try {
      const item: Item = req.body;
      console.log(item);
      const savedItem = await itensRepository.save(item);
      res.status(201).send(savedItem);
    } catch (err) {
      res.status(500).send({
        message: "Erro ao tentar salvar um item"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const itens = await itensRepository.retrieveAll();
      res.status(200).send(itens);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials."
      });
    }
  }
  //atualização
  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const item = await itensRepository.retrieveById(id);
      if (item) res.status(200).send(item);
      else
        res.status(404).send({
          message: `Não foi encontrado nenhum Item com esse id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error não foi possivel retornar nenhum Item com id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let item: Item = req.body;
    item.id = parseInt(req.params.id);
    try {
       await itensRepository.update(item);
       
    } catch (err) {
      res.status(500).send({
        message: `Error ao atualizar o Item com id=${item.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const num = await itensRepository.delete(id);
      if (num == 1) {
        res.send({
          message: "Item deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar o Item com id=${id}. Talvez o Item não tenha sido encontrado.`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `O Item com id==${id}, não pode ser deletado.`
      });
    }
  }
  
  
}
