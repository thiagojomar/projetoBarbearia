import { Agendamento } from "../models/agendamento";


class AgendamentoRepository {
    agendamendoDB = new Array<Agendamento>();

    async save(agendamento: Agendamento): Promise<Agendamento> {
        try {
            this.agendamendoDB.push(agendamento);
            return agendamento
        } catch (erro) {
            throw new Error("Falha ao criar Agendamento.")
        }
    }

    async retrieveAll(): Promise<Array<Agendamento>> {
        try {
            return this.agendamendoDB;
        } catch (erro) {
            throw new Error("Falha ao retornar todos os Agendamentos.");
        }
    }

    async retrieveById(agendamentoId: number): Promise<Agendamento | null> {
        try {
            var encontrado = false;
            var agendamentoEncontrado = null;
            this.agendamendoDB.forEach(element => {            
                if (element.id == agendamentoId) {
                  agendamentoEncontrado = element;
                    encontrado = true;
                }
            });
            if (encontrado) {
                return agendamentoEncontrado;
            } 
            return null;         
        } catch (error) {
            throw new Error("Falha ao buscar o Agendamento!");
        }
      }
      
          async update(agendamento: Agendamento): Promise<number> {
            const { id, cliente, barbeiro, data, valorTotal, detalhamento, published } = agendamento;
            try {
                var encontrado = false;
                this.agendamendoDB.forEach(element => {
                    if (element.id == agendamento.id) {
                        element.cliente = agendamento.cliente;
                        encontrado = true;
                    }
                });
                if (encontrado) {
                    return 1;
                } 
                return 0;
            } catch (error) {
                throw new Error("Falha ao atualizar o Agendamento!");
            }
        }
      
            async delete(agendamentoId: number): Promise<number> {
              try {
                  var encontrado = false;
                  this.agendamendoDB.forEach(element => {
                      if (element.id == agendamentoId) {
                          this.agendamendoDB.splice(this.agendamendoDB.indexOf(element), 1);
                          encontrado = true;
                      }
                  });
                  if (encontrado) {
                      return 1;
                  } 
                  return 0;
              } catch (error) {
                  throw new Error("Falha ao deletar o Agendamento!");
              }
          }
          async deleteAll(): Promise<number> {
            try {
                let num = this.agendamendoDB.length;
                this.agendamendoDB.splice(0, this.agendamendoDB.length);
                return num;
            } catch (error) {
                throw new Error("Falha ao deletar todos os Agendamentos!");
            }
        }

}

export default new AgendamentoRepository();