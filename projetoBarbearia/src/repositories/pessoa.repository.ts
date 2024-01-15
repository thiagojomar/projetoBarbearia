import { AppDataSource } from "../db/data-source";
import { Pessoa } from "../models/pessoa";


class PessoaRepository {
  
    pessoaRepository = AppDataSource.getRepository(Pessoa);

    async save(pessoa: Pessoa): Promise<Pessoa> {
        try {
            this.pessoaRepository.save(pessoa);
            return pessoa
        } catch (erro) {
            throw new Error("Falha ao criar a Pessoa.")
        }
    }

    async retrieveAll(): Promise<Array<Pessoa>> {
        try {
            return this.pessoaRepository.find();
        } catch (erro) {
            throw new Error("Falha ao retornar pessoa.");
        }
    }

    async retrieveById(pessoaCpf: number): Promise<Pessoa | null> {
        try {
            
            var pessoaEncontrado = this.pessoaRepository.findOneBy({cpf: pessoaCpf});
           
            if (pessoaEncontrado) {
                return pessoaEncontrado;
            } 
            return null;         
        } catch (error) {
            throw new Error("Falha ao buscar a pessoa!");
        }
      }
      
          async update(pessoa: Pessoa): Promise<number> {
            const { nome, telefone, dataNascimento, cpf } = pessoa;
            try {
                this.pessoaRepository.save(pessoa);
                  return 0;
              } catch (error) {
                  throw new Error("Falha ao deletar a Pessoa!");
              }
          }

          async delete(pessoaCpf: number): Promise<number> {
            try {
                const pessoaEncontrado = await this.pessoaRepository.findOneBy({
                    cpf: pessoaCpf});
                if (pessoaEncontrado) {
                    this.pessoaRepository.remove(pessoaEncontrado);
                    return 1;
                }
                return 0;
            } catch (error) {
                throw new Error("Falha ao deletar o gênero!");
            }
        }
          

}

export default new PessoaRepository();