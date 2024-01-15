import { AppDataSource } from "../db/data-source";
import { Funcionario } from "../models/funcionario";

class FuncionarioRepository {

    funcionarioRepository = AppDataSource.getRepository(Funcionario);

    async save(funcionario: Funcionario): Promise<Funcionario> {
        try {
            this.funcionarioRepository.save(funcionario);
            return funcionario;
        } catch (erro) {
            throw new Error("Falha ao criar item.")
        }
    }

    async retrieveAll(): Promise<Array<Funcionario>> {
        try {
            return this.funcionarioRepository.find();
        } catch (erro) {
            throw new Error("Falha ao retornar itens.");
        }
    }

    async retrieveById(funcionarioCnpj: number): Promise<Funcionario | null> {
        try {
            var funcionarioEncontrado = this.funcionarioRepository.findOneBy({cnpj: funcionarioCnpj});
            
            if (funcionarioEncontrado) {
                return funcionarioEncontrado;
            } 
            return null;         
        } catch (error) {
            throw new Error("Falha ao buscar o funcionário!");
        }
      }
      
          async update(funcionario: Funcionario) {
            const { cnpj, nome, telefone, dataNascimento } = funcionario;
            try {
                this.funcionarioRepository.save(funcionario);
            } catch (error) {
                throw new Error("Falha ao atualizar o Funcionário!");
            }
        }
      
            async delete(funcionarioCnpj: number): Promise<number> {
              try {
                  const funcionarioEncontrado = await this.funcionarioRepository.findOneBy({cnpj: funcionarioCnpj});
                                  
                  if (funcionarioEncontrado) {
                    this.funcionarioRepository.remove(funcionarioEncontrado);
                      return 1;
                  } 
                  return 0;
              } catch (error) {
                  throw new Error("Falha ao deletar o Funcionário!");
              }
          }
         

}

export default new FuncionarioRepository();