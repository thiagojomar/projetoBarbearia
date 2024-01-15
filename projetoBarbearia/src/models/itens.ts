// Importa os módulos necessários do TypeORM
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from './agendamento';


// Define a entidade para a tabela Itens
@Entity({ name: 'Itens' })
export class Item {
    // Coluna para o idItens
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    // Coluna para o nome
    @Column({ type: 'varchar', length: 45, nullable: false })
    nome: string;

    // Coluna para o valor
    @Column({ type: 'int', nullable: false })
    valor: number;

    // Coluna para a quantidade
    @Column({ type: 'int', nullable: true })
    quantidade: number;

    constructor(id: number, nome: string, valor: number, quantidade: number) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
    }
    @OneToMany(() => Agendamento, (agendamento) => agendamento.itens)
    agendamentos!: Agendamento[];
 
}

