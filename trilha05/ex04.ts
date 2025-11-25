type VoteResults = Record<string, number>;
type SortedResults = { candidate: string, votes: number }[];

abstract class VoteSystem {
    protected votes: VoteResults = {};

    public abstract voteFor(candidate: string): void;

    public abstract getResults(): object;

    protected getCurrentVotes(): VoteResults {
        return this.votes;
    }
}

class Election extends VoteSystem {
    private electionName: string;

    constructor(name: string) {
        super();
        this.electionName = name;
        console.log(`\n[Sistema] Sistema de Eleição "${this.electionName}" iniciado.`);
    }
    public voteFor(candidate: string): void {
        const key = candidate.trim();
        if (key === "") return;

        this.votes[key] = (this.votes[key] || 0) + 1;
        console.log(`[VOTO - ${this.electionName}] Voto registrado para: ${key}`);
    }

    public getResults(): VoteResults {
        console.log(`\n--- Resultados da Eleição: ${this.electionName} ---`);
        const results = this.getCurrentVotes();

        if (Object.keys(results).length === 0) {
            console.log("Nenhum voto registrado.");
        } else {
            console.log("Total de votos por chapa:");
            console.log(results);
        }
        return results;
    }
}

class Poll extends VoteSystem {
    private pollTopic: string;

    constructor(topic: string) {
        super();
        this.pollTopic = topic;
        console.log(`\n[Sistema] Sistema de Enquete "${this.pollTopic}" iniciado.`);
    }

    public voteFor(candidate: string): void {
        const key = candidate.trim();
        if (key === "") return;

        this.votes[key] = (this.votes[key] || 0) + 1;
        console.log(`[VOTO - ${this.pollTopic}] Voto registrado para: ${key}`);
    }


    public getResults(): SortedResults {
        const rawVotes = this.getCurrentVotes();

        const sortedResults: SortedResults = Object.keys(rawVotes)
            .map(candidate => ({
                candidate: candidate,
                votes: rawVotes[candidate]
            }))
            .sort((a, b) => b.votes - a.votes); 

        console.log(`\n--- Resultados da Enquete: ${this.pollTopic} (Classificação) ---`);

        if (sortedResults.length === 0) {
            console.log("Nenhum voto registrado.");
        } else {
            sortedResults.forEach((result, index) => {
                console.log(`${index + 1}º Lugar: ${result.candidate} com ${result.votes} votos`);
            });
        }

        return sortedResults;
    }
}


const eleicaoSindical = new Election("Eleição para Presidente do Sindicato");
const enqueteComida = new Poll("Qual a Melhor Comida do Mundo?");

eleicaoSindical.voteFor("Chapa Azul");
eleicaoSindical.voteFor("Chapa Vermelha");
eleicaoSindical.voteFor("Chapa Azul");
eleicaoSindical.voteFor("Chapa Branca");
eleicaoSindical.voteFor("Chapa Azul");

enqueteComida.voteFor("Pizza");
enqueteComida.voteFor("Sushi");
enqueteComida.voteFor("Pizza");
enqueteComida.voteFor("Hambúrguer");
enqueteComida.voteFor("Sushi");
enqueteComida.voteFor("Pizza");
enqueteComida.voteFor("Sushi");
enqueteComida.voteFor("Hambúrguer");
enqueteComida.voteFor("Sushi");
enqueteComida.voteFor("Hambúrguer");

eleicaoSindical.getResults();
enqueteComida.getResults();