import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class NamespaceModel {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    name: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}