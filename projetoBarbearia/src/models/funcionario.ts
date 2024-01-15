import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Agendamento } from './agendamento';

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    cnpj!: number;

    @Column({ length: 45, nullable: false })
    nome!: string;

    @Column({ length: 45, nullable: false })
    telefone!: string;

    @Column({ length: 45, nullable: false })
    dataNascimento!: string;

    @OneToOne(() => Agendamento, (agendamento) => agendamento.funcionario)
    @JoinColumn({ name: 'Funcionario_cnpj' })
    agendamento!: Agendamento;
}