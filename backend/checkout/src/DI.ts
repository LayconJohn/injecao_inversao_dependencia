export class Registry {
    private dependencies: { [name: string]: any};

    constructor(){
        this.dependencies = {};
    }

    provide(name: string, dependencie: any) {
        this.dependencies[name] = dependencie;
    }

    inject(name: string) {
        return this.dependencies[name];
    }
}