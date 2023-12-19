import { Request, Response } from "express";
import { funcionario } from "../models/funcionario";
import funcionarioRepository from "../repositories/funcionario.repository";

export default class FuncionarioController {
    async create(req: Request, res: Response) {
        if (!req.body.title) {
            res.status(400).send({
                message: "Não pode ser vazio!"
            });
            return;
        }

        try {
            const funcionario: funcionario = req.body;
            if (!funcionario.published) funcionario.published = false;

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
        let funcionario: funcionario = req.body;
        funcionario.id = parseInt(req.params.id);
    
        try {
          const num = await funcionarioRepository.update(funcionario);
    
          if (num == 1) {
            res.send({
              message: "Funcionario foi atualizado com sucesso."
            });
          } else {
            res.send({
              message: `Não foi possivel atualizar o funcionario com id=${funcionario.id}. Talvez o funcionario não foi encontrado ou está vazio.`
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `Error ao atualizar o funcionario com id=${funcionario.id}.`
          });
        }
      }
    
      async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
    
        try {
          const num = await funcionarioRepository.delete(id);
    
          if (num == 1) {
            res.send({
              message: "Funcionario deletado com sucesso!"
            });
          } else {
            res.send({
              message: `Não foi possível deletar o funcionario com id=${id}. Talvez o funcionario não tenha sido encontrado.`,
            });
          }
        } catch (err) {
          res.status(500).send({
            message: `O funcionario com id==${id}, não pode ser deletado.`
          });
        }
      }

      async deleteAll(req: Request, res: Response) {
        try {
          const num = await funcionarioRepository.deleteAll();
    
          res.send({ message: `${num} funcionario foram deletados com sucesso!` });
        } catch (err) {
          res.status(500).send({
            message: "Algum erro ocorreu enquato deletava todos os funcionarios."
          });
        }
      }
}
