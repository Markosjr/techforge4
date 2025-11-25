class Agenda {
    private compromissos: string[] = [];

   
    constructor() {
        console.log("Agenda criada. Pronta para receber novos compromissos.");
    }

    public adicionarCompromisso(compromisso: string): void {
        if (compromisso && compromisso.trim() !== "") {
            this.compromissos.push(compromisso);
            console.log(`[SUCESSO] Compromisso adicionado: "${compromisso}"`);
        } else {
            console.log("[ERRO] A descrição do compromisso não pode ser vazia.");
        }
    }
    
    public listarCompromissos(): void {
        console.log("\n--- LISTA DE COMPROMISSOS ---");

        if (this.compromissos.length === 0) {
            console.log("Nenhum compromisso agendado por enquanto.");
            console.log("-----------------------------");
            return;
        }

        this.compromissos.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });

        console.log("-----------------------------");
        console.log(`Total de compromissos: ${this.compromissos.length}`);
    }
}

const minhaAgenda = new Agenda();

minhaAgenda.adicionarCompromisso("Reunião com o a equipq");
minhaAgenda.adicionarCompromisso("Consulta médica às 14:30");
minhaAgenda.adicionarCompromisso("Ir a natacao as 17h");

minhaAgenda.listarCompromissos();

minhaAgenda.adicionarCompromisso("Preparar o jantar");
minhaAgenda.listarCompromissos();