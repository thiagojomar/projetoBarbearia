import { Item } from "../models/itens";
import { AppDataSource } from "../db/data-source";

class ItensRepository {
    
    itensRepository = AppDataSource.getRepository(Item)

    async save(item: Item): Promise<Item> {
        try {
            console.log(item);
            this.itensRepository.save(item);
            return item;
        } catch (erro) {
            throw new Error("Falha ao criar item. aqui")
        }
    }

    async retrieveAll(): Promise<Array<Item>> {
        try {
            return this.itensRepository.find();
        } catch (erro) {
            throw new Error("Falha ao retornar itens.");
        }
    }
    //atualização
    async retrieveById(itemId: number): Promise<Item | null> {
        try {
            var itemEncontrado = this.itensRepository.findOneBy({id: itemId}); //
            
            if (itemEncontrado) {
                return itemEncontrado;
            }
            return null;
        } catch (error) {
            throw new Error("Falha ao buscar o Item!");
        }
    }

    async update(item: Item) {
        const { id, nome, valor, quantidade } = item;
        try {
            this.itensRepository.update(id, {nome, valor, quantidade})
           
        } catch (error) {
            throw new Error("Falha ao atualizar o Item!");
        }
    }

    async delete(itemId: number): Promise<number> {
        try {
            const itemEncontrado = await this.itensRepository.findOneBy({id: itemId}); 
            if (itemEncontrado) {
                this.itensRepository.delete(itemEncontrado)
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o Item!");
        }
    }
    

}

export default new ItensRepository();