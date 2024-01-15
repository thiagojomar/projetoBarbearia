import { Request, Response } from "express";
import { Funcionario } from "../models/funcionario";
import funcionarioRepository from "../repositories/funcionario.repository";

export default class FuncionarioController {
    async create(req: Request, res: Response) {
        if (!req.body.nome) {
            res.status(400).send({
                message: "Não pode ser vazio!"
            });
            return;
        }

        try {
            const funcionario: Funcionario = req.body;
            const savedFuncionario = await funcionarioRepository.save(funcionario);
            res.status(201).send(savedFuncionario);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar um genero"
            });
        }
    }

    async findAll(req: Request, res: Response) {
          
        try {
          const funcionarios = await funcionarioRepository.retrieveAll();
          res.status(200).send(funcionarios);
        } catch (err) {
          res.status(500).send({
            message: "Some error occurred while retrieving tutorials."
          });
        }
      }

      async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
    
        try {
          const funcionario = await funcionarioRepository.retrieveById(id);
    
          if (funcionario) res.status(200).send(funcionario);
          else
            res.status(404).send({
              message: `Não foi encontrado nenhum funcionario com esse id=${id}.`
            });
        } catch (err) {
          res.status(500).send({
            message: `Error não foi possivel retornar nenhum funcionario com id=${id}.`
          });
        }
      }
    
      async update(req: Request, res: Response) {
        let funcionario: Funcionario = req.body;
        funcionario.cnpj = parseInt(req.params.id);
    
        try {
          await funcionarioRepository.update(funcionario);
        } catch (err) {
          res.status(500).send({
            message: `Error ao atualizar o funcionario com id=${funcionario.cnpj}.`
          });
        }
      }
    
      async delete(req: Request, res: Response) {
        const cnpj: number = parseInt(req.params.id);
    
        try {
          const num = await funcionarioRepository.delete(cnpj);
    
          if (num == 1) {
            res.send({
              message: "Funcionario deletado com sucesso!"
            });
          } else {
            res.send({
              message: `Não foi possível deletar o funcionario com id=${cnpj}. Talvez o funcionario não tenha sido encontrado.`,
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `O funcionario com id==${cnpj}, não pode ser deletado.`
          });
        }
      }

      
}
