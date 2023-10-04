import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class UserModel {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    active: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}