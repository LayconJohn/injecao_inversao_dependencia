export class Registry {
    private dependencies: { [name: string]: any};
    static instance: Registry;

    private constructor(){
        this.dependencies = {};
    }

    provide(name: string, dependencie: any) {
        this.dependencies[name] = dependencie;
    }

    inject(name: string) {
        return this.dependencies[name];
    }

    static getInstance(){
        if(!Registry.instance) {
            Registry.instance = new Registry();
        }
        return Registry.instance;
    }
}