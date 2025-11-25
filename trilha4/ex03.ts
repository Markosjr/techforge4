interface ProdutoLoja {
    codigo: number;
    nome: string;
}

class Loja {
    private produtos: ProdutoLoja[] = [];

    adicionarProduto(produto: ProdutoLoja): void {
        this.produtos.push(produto);
    }
    buscarProdutoPorCodigo(codigo: number): ProdutoLoja | undefined {
        const produtoEncontrado = this.produtos.find(
            (produto) => produto.codigo === codigo
        );

        return produtoEncontrado;
    }
}

const minhaLoja = new Loja();

minhaLoja.adicionarProduto({ codigo: 10, nome: "Notebook Pro" });
minhaLoja.adicionarProduto({ codigo: 25, nome: "Mouse Sem Fio" });
minhaLoja.adicionarProduto({ codigo: 42, nome: "Teclado Mecânico" });

console.log("--- Teste de Busca ---");

const produto25 = minhaLoja.buscarProdutoPorCodigo(25);
if (produto25) {
    console.log(`Produto encontrado (25): ${produto25.nome}`);
}

const produto99 = minhaLoja.buscarProdutoPorCodigo(99);
if (produto99 === undefined) {
    console.log("Produto não encontrado (99): undefined");
}