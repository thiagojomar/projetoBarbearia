import { Itens } from "../models/itens";

class ItensRepository {
    itensDB = new Array<Itens>();

    async save(item: Itens): Promise<Itens> {
        try {
            this.itensDB.push(item);
            return item
        } catch (erro) {
            throw new Error("Falha ao criar item.")
        }
    }

    async retrieveAll(): Promise<Array<Itens>> {
        try {
            return this.itensDB;
        } catch (erro) {
            throw new Error("Falha ao retornar itens.");
        }
    }
//atualização
async retrieveById(itemId: number): Promise<Itens | null> {
  try {
      var encontrado = false;
      var itemEncontrado = null;
      this.itensDB.forEach(element => {            
          if (element.id == itemId) {
            itemEncontrado = element;
              encontrado = true;
          }
      });
      if (encontrado) {
          return itemEncontrado;
      } 
      return null;         
  } catch (error) {
      throw new Error("Falha ao buscar o Item!");
  }
}

    async update(item: Itens): Promise<number> {
      const { id, nome, valor, quantidade, published } = item;
      try {
          var encontrado = false;
          this.itensDB.forEach(element => {
              if (element.id == item.id) {
                  element.nome = item.nome;
                  encontrado = true;
              }
          });
          if (encontrado) {
              return 1;
          } 
          return 0;
      } catch (error) {
          throw new Error("Falha ao atualizar o Item!");
      }
  }

      async delete(itemId: number): Promise<number> {
        try {
            var encontrado = false;
            this.itensDB.forEach(element => {
                if (element.id == itemId) {
                    this.itensDB.splice(this.itensDB.indexOf(element), 1);
                    encontrado = true;
                }
            });
            if (encontrado) {
                return 1;
            } 
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o Item!");
        }
    }
    async deleteAll(): Promise<number> {
      try {
          let num = this.itensDB.length;
          this.itensDB.splice(0, this.itensDB.length);
          return num;
      } catch (error) {
          throw new Error("Falha ao deletar todos os Itens!");
      }
  }

}

export default new ItensRepository();