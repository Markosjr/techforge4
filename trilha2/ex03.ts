class Produto {
    private nome: string;
    private preco: number;
    private quantidade: number;

    constructor(nome: string, preco: number, quantidade: number) {
        this.nome = nome;
        this.preco = preco > 0 ? preco : 0;
        this.quantidade = quantidade >= 0 ? quantidade : 0;
        console.log(`Produto "${this.nome}" criado.`);
    }


    public calcularValorTotalEstoque(): number {
        return this.preco * this.quantidade;
    }

    public exibirDetalhes(): void {
        const valorTotal = this.calcularValorTotalEstoque();
        console.log("-----------------------------------------");
        console.log(`Nome: ${this.nome}`);
        console.log(`Preço Unitário: R$${this.preco.toFixed(2)}`);
        console.log(`Quantidade em Estoque: ${this.quantidade}`);
        console.log(`VALOR TOTAL EM ESTOQUE: R$${valorTotal.toFixed(2)}`);
        console.log("-----------------------------------------");
    }

    public adicionarEstoque(unidades: number): void {
        if (unidades > 0) {
            this.quantidade += unidades;
            console.log(`${unidades} unidades de ${this.nome} adicionadas. Novo total: ${this.quantidade}`);
        }
    }

    public removerEstoque(unidades: number): boolean {
        if (unidades > 0 && this.quantidade >= unidades) {
            this.quantidade -= unidades;
            console.log(`${unidades} unidades de ${this.nome} removidas. Novo total: ${this.quantidade}`);
            return true;
        } else if (unidades > 0) {
            console.log(`Erro: Estoque insuficiente de ${this.nome}. Disponível: ${this.quantidade}.`);
            return false;
        }
        return false;
    }
}

