interface Animal {
    eat(): void;
}

interface Person extends Animal {
    work(): void;
}

// Web 必须实现Person和Animal这两个接口
class Web implements Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    eat() {
        console.log(this.name + '喜欢吃');
    }

    work() {
        console.log(this.name + '在工作')
    }
}