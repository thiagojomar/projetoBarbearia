import { funcionario } from "../models/funcionario";

class FuncionarioRepository {
    funcionarioDB = new Array<funcionario>();

    async save(funcionario: funcionario): Promise<funcionario> {
        try {
            this.funcionarioDB.push(funcionario);
            return funcionario
        } catch (erro) {
            throw new Error("Falha ao criar item.")
        }
    }

    async retrieveAll(): Promise<Array<funcionario>> {
        try {
            return this.funcionarioDB;
        } catch (erro) {
            throw new Error("Falha ao retornar itens.");
        }
    }

    async retrieveById(funcionarioId: number): Promise<funcionario | null> {
        try {
            var encontrado = false;
            var funcionarioEncontrado = null;
            this.funcionarioDB.forEach(element => {            
                if (element.id == funcionarioId) {
                  funcionarioEncontrado = element;
                    encontrado = true;
                }
            });
            if (encontrado) {
                return funcionarioEncontrado;
            } 
            return null;         
        } catch (error) {
            throw new Error("Falha ao buscar o funcionário!");
        }
      }
      
          async update(funcionario: funcionario): Promise<number> {
            const { id, nome, telefone, dataNascimento, cpf, cnpj, published } = funcionario;
            try {
                var encontrado = false;
                this.funcionarioDB.forEach(element => {
                    if (element.id == funcionario.id) {
                        element.nome = funcionario.nome;
                        encontrado = true;
                    }
                });
                if (encontrado) {
                    return 1;
                } 
                return 0;
            } catch (error) {
                throw new Error("Falha ao atualizar o Funcionário!");
            }
        }
      
            async delete(funcionarioId: number): Promise<number> {
              try {
                  var encontrado = false;
                  this.funcionarioDB.forEach(element => {
                      if (element.id == funcionarioId) {
                          this.funcionarioDB.splice(this.funcionarioDB.indexOf(element), 1);
                          encontrado = true;
                      }
                  });
                  if (encontrado) {
                      return 1;
                  } 
                  return 0;
              } catch (error) {
                  throw new Error("Falha ao deletar o Funcionário!");
              }
          }
          async deleteAll(): Promise<number> {
            try {
                let num = this.funcionarioDB.length;
                this.funcionarioDB.splice(0, this.funcionarioDB.length);
                return num;
            } catch (error) {
                throw new Error("Falha ao deletar todos os Funcionários!");
            }
        }

}

export default new FuncionarioRepository();