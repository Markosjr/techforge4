interface ItemPedido {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
}

type StatusPagamento = "Pendente" | "Processando" | "Aprovado" | "Recusado";
type StatusEnvio = "Processando" | "Em Preparação" | "Enviado" | "Entregue" | "Cancelado";


console.log("--- Pedido V1: Implementação Monolítica (Alto Acoplamento) ---");

class PedidoV1 {
    private itens: ItemPedido[] = [];
    public precoTotal: number = 0;
    public statusPagamento: StatusPagamento = "Pendente";
    public statusEnvio: StatusEnvio = "Processando";

  
    public adicionarItem(item: ItemPedido): void {
        this.itens.push(item);
        console.log(`[V1] Item adicionado: ${item.nome} (${item.quantidade}x R$${item.preco.toFixed(2)})`);
        this.calcularPrecoTotal(); 
    }

   
    private calcularPrecoTotal(): void {
        this.precoTotal = this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        console.log(`[V1] Preço total recalculado: R$${this.precoTotal.toFixed(2)}`);
    }

    public processarPagamento(valor: number): boolean {
        console.log(`[V1] Tentando processar pagamento de R$${valor.toFixed(2)}...`);
        if (valor >= this.precoTotal) {
            this.statusPagamento = "Aprovado";
            console.log(`[V1] Pagamento APROVADO.`);
            return true;
        } else {
            this.statusPagamento = "Recusado";
            console.log(`[V1] Pagamento RECUSADO: Valor insuficiente.`);
            return false;
        }
    }


    public atualizarStatusEnvio(novoStatus: StatusEnvio): void {
        this.statusEnvio = novoStatus;
        console.log(`[V1] Status de envio atualizado para: ${this.statusEnvio}`);
    }

    public exibirStatus(): void {
        console.log(`[V1] Status: Total: R$${this.precoTotal.toFixed(2)} | Pagamento: ${this.statusPagamento} | Envio: ${this.statusEnvio}`);
    }
}



console.log("\n--- Pedido V2: Implementação Refatorada (Baixo Acoplamento) ---");

class Carrinho {
    private itens: ItemPedido[] = [];

    public adicionarItem(item: ItemPedido): void {
        this.itens.push(item);
        console.log(`[Carrinho] Item adicionado: ${item.nome}`);
    }

    public calcularSubtotal(): number {
        return this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }

    public obterItens(): ItemPedido[] {
        return this.itens;
    }
}

class ProcessadorPagamento {
    private status: StatusPagamento = "Pendente";

    public processar(valor: number): boolean {
        this.status = "Processando";
        console.log(`[Pagamento] Processando transação de R$${valor.toFixed(2)}...`);

        if (valor > 0) {
            this.status = "Aprovado";
            return true;
        } else {
            this.status = "Recusado";
            return false;
        }
    }

    public obterStatus(): StatusPagamento {
        return this.status;
    }
}

class GerenciadorEnvio {
    private status: StatusEnvio = "Processando";

    public atualizarStatus(novoStatus: StatusEnvio): void {
        this.status = novoStatus;
        console.log(`[Envio] Status atualizado para: ${this.status}`);
    }

    public obterStatus(): StatusEnvio {
        return this.status;
    }
}
class PedidoV2 {
    private carrinho: Carrinho;
    private pagto: ProcessadorPagamento;
    private envio: GerenciadorEnvio;
    public precoTotal: number = 0; 

  
    constructor(carrinho: Carrinho, pagto: ProcessadorPagamento, envio: GerenciadorEnvio) {
        this.carrinho = carrinho;
        this.pagto = pagto;
        this.envio = envio;
        console.log("[Pedido V2] Pedido orquestrador criado com sucesso.");
    }

    public finalizarPedido(): boolean {
        this.precoTotal = this.carrinho.calcularSubtotal();
        console.log(`[Pedido V2] Preço Total do Carrinho: R$${this.precoTotal.toFixed(2)}`);

        const pagamentoAprovado = this.pagto.processar(this.precoTotal);

        if (pagamentoAprovado) {
            this.envio.atualizarStatus("Em Preparação");
            return true;
        }

        this.envio.atualizarStatus("Cancelado");
        return false;
    }

    public exibirStatus(): void {
        console.log(`[Pedido V2] Status Final: Total: R$${this.precoTotal.toFixed(2)} | Pagamento: ${this.pagto.obterStatus()} | Envio: ${this.envio.obterStatus()}`);
    }

    public adicionarItem(item: ItemPedido): void {
        this.carrinho.adicionarItem(item);
    }
}


const pedido1 = new PedidoV1();
pedido1.adicionarItem({ id: 101, nome: "Laptop", preco: 2500.00, quantidade: 1 });
pedido1.adicionarItem({ id: 102, nome: "Mouse", preco: 50.00, quantidade: 2 });
pedido1.processarPagamento(2600.00);
pedido1.atualizarStatusEnvio("Enviado");
pedido1.exibirStatus();


const carrinho = new Carrinho();
const processadorPagto = new ProcessadorPagamento();
const gerenciadorEnvio = new GerenciadorEnvio();

const pedido2 = new PedidoV2(carrinho, processadorPagto, gerenciadorEnvio); 

pedido2.adicionarItem({ id: 201, nome: "Livro POO", preco: 80.00, quantidade: 1 });
pedido2.adicionarItem({ id: 202, nome: "Caneta Gel", preco: 5.00, quantidade: 3 });

pedido2.finalizarPedido();
pedido2.exibirStatus();