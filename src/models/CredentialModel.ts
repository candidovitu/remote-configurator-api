import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ObjectId } from "typeorm"

@Entity()
export class CredentialModel {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    accessKey: string;

    @Column({ select: false })
    secretKey: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date
}