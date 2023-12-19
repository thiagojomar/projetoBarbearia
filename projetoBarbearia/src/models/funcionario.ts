import { Pessoa } from "./pessoa";

export class funcionario extends Pessoa {
    cnpj: string

    constructor(id: number, nome: string, telefone: string, dataNascimento: string, cpf: string, cnpj: string) {
        super(id, nome, telefone, dataNascimento, cpf)
        this.cnpj = cnpj;
    }

    public toString(): string {
        return super.toString() + ' CNPJ - ' + this.cnpj;

    }

    getID(): number {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(novoNome: string): void {
        this.nome = novoNome;
    }

    getTelefone(): string {
        return this.telefone;
    }

    setTelefone(novoTelefone: string): void {
        this.telefone = novoTelefone;
    }

    getdataNascimento(): string {
        return this.dataNascimento;
    }

    setdataNascimento(novadataNascimento: string): void {
        this.dataNascimento = novadataNascimento;
    }

    getCPF(): string {
        return this.cpf;
    }

    getCNPJ(): string {
        return this.cnpj;
    }
}