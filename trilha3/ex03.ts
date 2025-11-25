
abstract class Pagamento {
    abstract processar(): string; 
}

class PagamentoCartao extends Pagamento {
    constructor(private numeroCartao: string, private valor: number) {
        super();
    }

    private validarCartao(): boolean {
        return this.numeroCartao && this.numeroCartao.replace(/\s/g, '').length === 16;
    }

    
    processar(): string {
        if (this.validarCartao()) {
            return `✅ Pagamento de R$ ${this.valor.toFixed(2)} processado com sucesso no Cartão (Final: ${this.numeroCartao.slice(-4)}).`;
        } else {
            return `❌ Falha: Número do cartão inválido. Pagamento não processado.`;
        }
    }
}

class PagamentoBoleto extends Pagamento {
    constructor(private valor: number) {
        super();
    }

    private gerarCodigoBoleto(): string {
        const timestamp = new Date().getTime();
        return `4321${Math.floor(Math.random() * 100000)}0000${timestamp}`.slice(0, 48);
    }


    processar(): string {
        const codigo = this.gerarCodigoBoleto();
        return `🧾 Boleto de R$ ${this.valor.toFixed(2)} gerado. Código para pagamento: ${codigo}.`;
    }
}

function executarProcessamento(pagamento: Pagamento): void {
    const resultado = pagamento.processar();
    console.log(`[${pagamento.constructor.name}]: ${resultado}`);
}
