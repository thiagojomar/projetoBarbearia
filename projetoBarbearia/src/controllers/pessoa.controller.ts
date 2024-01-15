import { Request, Response } from "express";
import { Pessoa } from "../models/pessoa";
import pessoaRepository from "../repositories/pessoa.repository";

export default class PessoaController {
    async create(req: Request, res: Response) {
        if (!req.body.nome) {
            res.status(400).send({
                message: "Não pode ser vazio!"
            });
            return;
        }

        try {
            const pessoa: Pessoa = req.body;
            const savedPessoa = await pessoaRepository.save(pessoa);

            res.status(201).send(savedPessoa);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar Pessoa"
            });
        }
    }

    async findAll(req: Request, res: Response) {
           
        try {
          const pessoas = await pessoaRepository.retrieveAll();
    
          res.status(200).send(pessoas);
        } catch (err) {
          res.status(500).send({
            message: "Erro ao tentar buscar todas as Pessoas"
          });
        }
      }

      async findOne(req: Request, res: Response) {
        const cpf: number = parseInt(req.params.cpf);
    
        try {
          const item = await pessoaRepository.retrieveById(cpf);
    
          if (item) res.status(200).send(item);
          else
            res.status(404).send({
              message: `Não foi encontrado nenhuma Pessoa com esse id=${cpf}.`
            });
        } catch (err) {
          res.status(500).send({
            message: `Error não foi possivel retornar nenhuma Pessoa com id=${cpf}.`
          });
        }
      }
    
      async update(req: Request, res: Response) {
        let pessoa: Pessoa = req.body;
        pessoa.cpf = parseInt(req.params.cpf);
    
        try {
          const num = await pessoaRepository.update(pessoa);
    
          if (num == 1) {
            res.send({
              message: "A Pessoa foi atualizada com sucesso."
            });
          } else {
            res.send({
              message: `Não foi possivel atualizar a Pessoa com id=${pessoa.cpf}. Talvez a Pessoa não foi encontrado ou está vazio.`
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `Error ao atualizar o Pessoa com id=${pessoa.cpf}.`
          });
        }
      }
    
      async delete(req: Request, res: Response) {
        const cpf: number = parseInt(req.params.cpf);
    
        try {
          const num = await pessoaRepository.delete(cpf);
    
          if (num == 1) {
            res.send({
              message: "Pessoa deletada com sucesso!"
            });
          } else {
            res.send({
              message: `Não foi possível deletar a Pessoa com id=${cpf}. Talvez a Pessoa não tenha sido encontrada.`,
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `A Pessoa com id==${cpf}, não pode ser deletado.`
          });
        }
      }
      
      
    }

