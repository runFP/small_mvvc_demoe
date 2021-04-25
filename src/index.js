class Index {
    constructor() {
        this.name = 'abc';
    }

    call(){
        console.log(this.name);
    }
}

const a = new Index();
a.call();