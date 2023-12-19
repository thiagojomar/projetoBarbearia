import { funcionario } from "./funcionario";
import { Pessoa } from "./pessoa";
import { Itens } from "./itens";

export class Agendamento {
    id: number;
    cliente: Pessoa;
    barbeiro: funcionario;
    data: Date;
    valorTotal: number;
    detalhamento: Array<Itens>;
    published?: boolean;

    constructor(id: number, cliente: Pessoa, barbeiro: funcionario, data: Date, valorTotal: number, detalhamento: Array<Itens>) {
        this.id = id;
        this.cliente = cliente;
        this.barbeiro = barbeiro;
        this.data = data;
        this.valorTotal = 0;
        this.detalhamento = new Array<Itens>();
    }

    public toString(): string {
        return this.cliente + ' - ' + this.barbeiro;
    }

    public addServico(itens: Itens): void {
        this.valorTotal += (itens.getValor() * itens.getQuantidade());
        this.detalhamento.push(itens);
    }

    getID(): number { 
        return this.id;
    }

    getCliente(): object {
        return this.cliente;
    }

    getBarbeiro(): object {
        return this.barbeiro;
    }

    getData(): Date {
        return this.data;
    }

    getValor(): number {
        return this.valorTotal;
    }

    getDetalhamento(): Array<Itens> {
        return this.detalhamento;
    }

}

