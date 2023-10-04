export class ConfigEntity {
    namespace: string;
    key: string;
    data: any;
    createdAt: Date;
    updatedAt: Date;

	constructor(props: ConfigEntity) {
        this.namespace = props.namespace;
        this.key = props.key;
        this.data = props.data;

        if(!props.createdAt) this.createdAt = new Date();
        else this.createdAt = this.createdAt;

        if(!props.updatedAt) this.updatedAt = new Date();
        else this.updatedAt = this.updatedAt;
    }
}