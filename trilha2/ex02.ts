class Livro {
    private titulo: string;
    private autor: string;
    private paginas: number;
    private lido: boolean;
   
    constructor(titulo: string, autor: string, paginas: number, lido: boolean = false) {
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.lido = lido;
        console.log(`Livro "${this.titulo}" de ${this.autor} (Total de ${this.paginas} páginas) foi adicionado.`);
    }

    public marcarComoLido(): void {
        if (this.lido) {
            console.log(`"${this.titulo}" já estava marcado como lido.`);
        } else {
            this.lido = true;
            console.log(`Parabéns! Você marcou o livro "${this.titulo}" como lido! 🎉`);
        }
    }
    public getStatus(): string {
        const status = this.lido ? "Sim" : "Não";
        return `"${this.titulo}", de ${this.autor}. Páginas: ${this.paginas}. Lido: ${status}.`;
    }

    public isLido(): boolean {
        return this.lido;
    }

    public getTitulo(): string {
        return this.titulo;
    }
}

