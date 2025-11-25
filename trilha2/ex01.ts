class ContaBancaria {

    private titular: string;
    private saldo: number;


    constructor(titular: string, saldo: number = 0) {
        this.titular = titular;
        this.saldo = saldo;
        console.log(`Conta de ${this.titular} criada com saldo inicial de R$${this.saldo.toFixed(2)}.`);
    }

    public getSaldo(): number {
        return this.saldo;
    }

  
    public getTitular(): string {
        return this.titular;
    }

  
    public depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.saldo.toFixed(2)}.`);
        } else {
            console.log("Erro: O valor do depósito deve ser positivo.");
        }
    }

   
    public sacar(valor: number): boolean {
        if (valor > 0) {
            if (this.saldo >= valor) {
                this.saldo -= valor;
                console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.saldo.toFixed(2)}.`);
                return true;
            } else {
                console.log(`Erro: Saldo insuficiente. Saldo atual: R$${this.saldo.toFixed(2)}. Valor solicitado: R$${valor.toFixed(2)}.`);
                return false;
            }
        } else {
            console.log("Erro: O valor do saque deve ser positivo.");
            return false;
        }
    }
}