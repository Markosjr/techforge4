class Temperatura {
    private valorCelsius: number;
    constructor(celsius: number) {
        this.valorCelsius = celsius;
        console.log(`Temperatura inicial definida: ${this.valorCelsius.toFixed(2)} °C.`);
    }

    public getCelsius(): number {
        return this.valorCelsius;
    }

    public paraFahrenheit(): number {
        const fahrenheit = (this.valorCelsius * 9/5) + 32;
        return fahrenheit;
    }

    public paraKelvin(): number {
        const kelvin = this.valorCelsius + 273.15;
        return kelvin;
    }

    public exibirConversões(): void {
        const fahrenheit = this.paraFahrenheit();
        const kelvin = this.paraKelvin();

        console.log("\n--- Resultado da Conversão ---");
        console.log(`Celsius (°C):    ${this.valorCelsius.toFixed(2)}`);
        console.log(`Fahrenheit (°F): ${fahrenheit.toFixed(2)}`);
        console.log(`Kelvin (K):      ${kelvin.toFixed(2)}`);
        console.log("------------------------------");
    }
}

