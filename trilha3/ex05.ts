abstract class Funcionario {
    private nome: string;
    private salario: number;

    constructor(nome: string, salario: number) {
        this.nome = nome;
        this.salario = salario;
    }

    public getNome(): string {
        return this.nome;
    }

    public getSalario(): number {
        return this.salario;
    }

    abstract calcularBonus(): number;
}

class Gerente extends Funcionario {
    calcularBonus(): number {
        return this.getSalario() * 0.10;
    }
}

class Operario extends Funcionario {
    calcularBonus(): number {
        return this.getSalario() * 0.05;
    }
}

function calcularSalarioComBonus(funcionarios: Funcionario[]): void {
    console.log("Salários com Bônus");

    funcionarios.forEach((func) => {
        const bonus = func.calcularBonus();
        const salarioFinal = func.getSalario() + bonus;

        const cargo = func.constructor.name; 

        console.log(`
            **Cargo:** ${cargo} (${func.getNome()})
            Salário Base: R$ ${func.getSalario().toFixed(2)}
            Bônus (${cargo === 'Gerente' ? '10%' : '5%'}): R$ ${bonus.toFixed(2)}
            **Salário Final: R$ ${salarioFinal.toFixed(2)}**
        `);
    });
}