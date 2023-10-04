export class NamespaceEntity {
    name: string;
    createdAt: Date;
    updatedAt: Date;

	constructor(props: NamespaceEntity) {
        this.name = props.name;

        if(!props.createdAt) this.createdAt = new Date();
        else this.createdAt = this.createdAt;

        if(!props.updatedAt) this.updatedAt = new Date();
        else this.updatedAt = this.updatedAt;
    }
}