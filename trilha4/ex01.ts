interface Produto {
    id: number;
    nome: string;
    preco: number;
}

class ItemLoja implements Produto {
    id: number;
    nome: string;
    preco: number;

    constructor(id: number, nome: string, preco: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }
}
const meuProduto = new ItemLoja(101, "Camiseta Básica", 49.90);

console.log(`ID: ${meuProduto.id}`);         
console.log(`Nome: ${meuProduto.nome}`);     
console.log(`Preço: R$ ${meuProduto.preco.toFixed(2)}`); 