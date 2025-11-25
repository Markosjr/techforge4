
abstract class FiguraGeometrica {
    abstract calcularArea(): number;
    getNome(): string {
        return this.constructor.name;
    }
}

class Circulo extends FiguraGeometrica {
    constructor(private raio: number) {
        super();
    }

    calcularArea(): number {
        return Math.PI * this.raio * this.raio;
    }
}

class Quadrado extends FiguraGeometrica {
    constructor(private lado: number) {
        super();
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }
}

class Triangulo extends FiguraGeometrica {
    constructor(private base: number, private altura: number) {
        super();
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }
}



function imprimirAreas(figuras: FiguraGeometrica[]): void {
    console.log("--- Cálculo de Áreas ---");
    figuras.forEach((figura) => {
        const area = figura.calcularArea();
        console.log(`Área do ${figura.getNome()}: ${area.toFixed(2)}`);
    });
    console.log("=");
}
