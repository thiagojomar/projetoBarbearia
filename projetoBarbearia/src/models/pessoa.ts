export class Pessoa{
    id: number;
    nome: string;
    telefone: string;
    dataNascimento: string;
    cpf: string;
    published?: boolean;

    constructor(id: number, nome: string, telefone: string, dataNascimento: string, cpf: string) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        
    }

    public toString(): string {
        return `Nome: ${this.nome} - Telefone: ${this.telefone} - Data de Nascimento: ${this.dataNascimento} - CPF: ${this.cpf}`;
    }

    getID(): number {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getTelefone(): string {
        return this.telefone;
    }

    setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    getdataNascimento(): string {
        return this.dataNascimento;
    }

    setdataNascimento(dataNascimento: string): void{
        this.dataNascimento = dataNascimento;
    }

    getCPF(): string {
        return this.cpf;
    }

}