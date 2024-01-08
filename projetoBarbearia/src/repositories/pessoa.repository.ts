import { Pessoa } from "../models/pessoa";

class PessoaRepository {
    pessoaDB = new Array<Pessoa>();

    async save(pessoa: Pessoa): Promise<Pessoa> {
        try {
            this.pessoaDB.push(pessoa);
            return pessoa
        } catch (erro) {
            throw new Error("Falha ao criar a Pessoa.")
        }
    }

    async retrieveAll(): Promise<Array<Pessoa>> {
        try {
            return this.pessoaDB;
        } catch (erro) {
            throw new Error("Falha ao retornar pessoa.");
        }
    }

    async retrieveById(pessoaId: number): Promise<Pessoa | null> {
        try {
            var encontrado = false;
            var pessoaEncontrado = null;
            this.pessoaDB.forEach(element => {            
                if (element.id == pessoaId) {
                    pessoaEncontrado = element;
                    encontrado = true;
                }
            });
            if (encontrado) {
                return pessoaEncontrado;
            } 
            return null;         
        } catch (error) {
            throw new Error("Falha ao buscar a pessoa!");
        }
      }
      
          async update(pessoa: Pessoa): Promise<number> {
            const { id, nome, telefone, dataNascimento, cpf, published } = pessoa;
            try {
                var encontrado = false;
                this.pessoaDB.forEach(element => {
                    if (element.id == pessoa.id) {
                        element.nome = pessoa.nome;
                        element.telefone = pessoa.telefone;
                        element.dataNascimento = pessoa.dataNascimento;
                        element.cpf = pessoa.cpf;
                        encontrado = true;
                    }
                });
                if (encontrado) {
                    return 1;
                } 
                return 0;
            } catch (error) {
                throw new Error("Falha ao atualizar a Pessoa!");
            }
        }
      
            async delete(pessoaId: number): Promise<number> {
              try {
                  var encontrado = false;
                  this.pessoaDB.forEach(element => {
                      if (element.id == pessoaId) {
                          this.pessoaDB.splice(this.pessoaDB.indexOf(element), 1);
                          encontrado = true;
                      }
                  });
                  if (encontrado) {
                      return 1;
                  } 
                  return 0;
              } catch (error) {
                  throw new Error("Falha ao deletar a Pessoa!");
              }
          }
          async deleteAll(): Promise<number> {
            try {
                let num = this.pessoaDB.length;
                this.pessoaDB.splice(0, this.pessoaDB.length);
                return num;
            } catch (error) {
                throw new Error("Falha ao deletar todas as Pessoas!");
            }
        }

}

export default new PessoaRepository();