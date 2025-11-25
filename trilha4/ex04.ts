interface Livro {
    titulo: string;
    autor: string;
    disponivel: boolean;
}
class Biblioteca {
    private acervo: Livro[] = [];

    adicionarLivro(livro: Livro): void {
        this.acervo.push(livro);
    }

    buscarLivrosDisponiveis(): Livro[] {
        const livrosDisponiveis = this.acervo.filter(
            (livro) => livro.disponivel === true
            
        );

        return livrosDisponiveis;
    }
}
const minhaBiblioteca = new Biblioteca();

minhaBiblioteca.adicionarLivro({ 
    titulo: "A História de TypeScript", 
    autor: "Anders Hejlsberg", 
    disponivel: true 
});

minhaBiblioteca.adicionarLivro({ 
    titulo: "Padrões de Projeto", 
    autor: "Gang of Four", 
    disponivel: false 
});

minhaBiblioteca.adicionarLivro({ 
    titulo: "Clean Code", 
    autor: "Uncle Bob", 
    disponivel: true 
});
const livrosEmEstoque = minhaBiblioteca.buscarLivrosDisponiveis();
console.log("--- Livros Disponíveis em Estoque ---");
if (livrosEmEstoque.length > 0) {
    livrosEmEstoque.forEach(livro => {
        console.log(`- ${livro.titulo} (Autor: ${livro.autor})`);
    });
} else {
    console.log("Nenhum livro disponível no momento.");
}

