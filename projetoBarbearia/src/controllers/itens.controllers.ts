import { Itens } from "../models/itens";
import { Request, Response } from "express";
import itensRepository from "../repositories/itens.repository";

export default class ItensController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Não pode ser vazio!"
      });
      return;
    }

    try {
      const item: Itens = req.body;
      if (!item.published) item.published = false;

      const savedItem = await itensRepository.save(item);

      res.status(201).send(savedItem);
    } catch (err) {
      res.status(500).send({
        message: "Erro ao tentar salvar um genero"
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
    let item: Itens = req.body;
    item.id = parseInt(req.params.id);

    try {
      const num = await itensRepository.update(item);

      if (num == 1) {
        res.send({
          message: "Item foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possivel atualizar o Item com id=${item.id}. Talvez o Item não foi encontrado ou está vazio.`
        });
      }
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
  
  async deleteAll(req: Request, res: Response) {
    try {
      const num = await itensRepository.deleteAll();

      res.send({ message: `${num} Itens foram deletados com sucesso!` });
    } catch (err) {
      res.status(500).send({
        message: "Algum erro ocorreu enquato deletava todos os Itens."
      });
    }
  }
}
