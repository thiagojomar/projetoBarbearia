import { AppDataSource } from "../db/data-source";
import { Agendamento } from "../models/agendamento";
AppDataSource

class AgendamentoRepository {
    
    agendamentoRepository = AppDataSource.getRepository(Agendamento)

    async save(agendamento: Agendamento): Promise<Agendamento> {
        try {
            this.agendamentoRepository.save(agendamento);
            return agendamento
        } catch (erro) {
            throw new Error("Falha ao criar Agendamento.")
        }
    }

    async retrieveAll(): Promise<Array<Agendamento>> {
        try {
            return this.agendamentoRepository.find();
        } catch (erro) {
            throw new Error("Falha ao retornar todos os Agendamentos.");
        }
    }

    async retrieveById(agendamentoId: number): Promise<Agendamento | null> {
        try {
            var agendamentoEncontrado = this.agendamentoRepository.findOneBy({idAgendamento: agendamentoId});
             if (agendamentoEncontrado) {
                return agendamentoEncontrado;
            } 
            return null;         
        } catch (error) {
            throw new Error("Falha ao buscar o Agendamento!");
        }
      }
      
          async update(agendamento: Agendamento): Promise<void> {
            const { idAgendamento, pessoa, funcionario, data, valor, itens } = agendamento;
            try {
                this.agendamentoRepository.save(agendamento);
            } catch (error) {
                throw new Error("Falha ao atualizar o Agendamento!");
            }
        }
      
            async delete(agendamentoId: number): Promise<number> {
              try {
                  const agendamentoEncontrado = await this.agendamentoRepository.findOneBy({idAgendamento: agendamentoId}); 
                  if (agendamentoEncontrado) {
                    this.agendamentoRepository.remove(agendamentoEncontrado)
                      return 1;
                  } 
                  return 0;
              } catch (error) {
                  throw new Error("Falha ao deletar o Agendamento!");
              }
          }
          

}

export default new AgendamentoRepository();
