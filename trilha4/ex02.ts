interface Documento {
    titulo: string;
    conteudo: string;
}
class Texto implements Documento {
    titulo: string;
    conteudo: string;

    constructor(titulo: string, conteudo: string) {
        this.titulo = titulo;
        this.conteudo = conteudo;
    }


    exibir(): string {
        return `Título: ${this.titulo}, Conteúdo: ${this.conteudo}`;
    }
}
const meuDocumento = new Texto(
    "Relatório Mensal",
    "Os dados de vendas superaram as expectativas em 15%."
);
const textoFormatado = meuDocumento.exibir();
console.log(textoFormatado);
