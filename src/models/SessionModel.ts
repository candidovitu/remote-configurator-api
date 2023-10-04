import { Entity, ObjectId, Column, ObjectIdColumn } from "typeorm"

@Entity()
export class SessionModel {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: string;

    @Column()
    token: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}