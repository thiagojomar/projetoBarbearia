export class Itens{
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
    published?: boolean;

    constructor(id: number, nome: string, valor: number, quantidade: number){
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
    }

    public toString(): string{
        return `ID: ${this.id}, Nome: ${this.nome}, valor: ${this.valor}, quantidade: ${this.quantidade}`;
    }

    getID(): number {
        return this.id;
    }

    setID(id: number) {
        this.id = id;
    }

    getNome(): string{ 
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getValor(): number { 
        return this.valor;
    }

    setValor(valor: number): void {
        this.valor = valor;
    }

    getQuantidade(): number {
        return this.quantidade;
    }

    setQuantidade(quantidade: number): void {
        this.quantidade = quantidade;
    }
}