import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @CreateDateColumn({ type: 'timestamp', name : 'created_at'})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', name : 'updated_at'})
    updated_at: Date;

    @DeleteDateColumn( {type: 'timestamp', name: 'deleted_at', nullable: true})
    deleted_at: Date;

}