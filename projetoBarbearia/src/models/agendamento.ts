import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm'; 
import { Pessoa } from './pessoa';
import { Funcionario } from './funcionario';
import { Item } from './itens';



@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  idAgendamento!: number;

  @Column({ type: 'date', nullable: false })
  data!: string;

  @Column({ nullable: false })
  valor!: number;

  @ManyToOne(() => Item, (item) => item.agendamentos)
  @JoinColumn({ name: 'Itens_idItens' })
  itens!: Item[];

  @OneToOne(() => Pessoa, (pessoa) => pessoa.agendamento)
  @JoinColumn({ name: 'Pessoa_cpf' })
  pessoa!: Pessoa;

  @OneToOne(() => Funcionario, (funcionario) => funcionario.agendamento)
  @JoinColumn({ name: 'Funcionario_cnpj' })
  funcionario!: Funcionario;
}