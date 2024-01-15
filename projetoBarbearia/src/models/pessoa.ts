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
export class Pessoa {
    @PrimaryGeneratedColumn()
    cpf!: number;

    @Column({ length: 60, nullable: false })
    nome!: string;

    @Column({ length: 45, nullable: false })
    telefone!: string;

    @Column({ length: 45, nullable: false })
    dataNascimento!: string;

    @OneToOne(() => Agendamento, (agendamento) => agendamento.pessoa)
    @JoinColumn({ name: 'Pessoa_cpf' })
    agendamento!: Agendamento;

    
}

