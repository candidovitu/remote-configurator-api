import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class ConfigModel {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    namespace: string;

    @Column()
    key: string;

    @Column()
    data: any;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}