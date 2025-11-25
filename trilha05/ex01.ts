abstract class TaskManager {
    protected tasks: string[] = [];

    public abstract addTask(task: string): void;

    public abstract listTasks(): string[];

   
    protected isDuplicate(task: string): boolean {
        return this.tasks.includes(task.trim());
    }
}

class Project extends TaskManager {
    private projectName: string;
    constructor(projectName: string) {
        super();
        this.projectName = projectName;
        console.log(`\n[Sistema] Gerenciador de Projeto: "${this.projectName}" iniciado.`);
    }

  
    public addTask(task: string): void {
        const trimmedTask = task.trim();
        if (this.isDuplicate(trimmedTask)) {
            console.log(`[ALERTA - ${this.projectName}] Tarefa duplicada ignorada: "${trimmedTask}"`);
            return;
        }

        this.tasks.push(trimmedTask);
        console.log(`[SUCESSO - ${this.projectName}] Tarefa adicionada: "${trimmedTask}"`);
    }


    public listTasks(): string[] {
        console.log(`\n--- Tarefas do Projeto: ${this.projectName} (${this.tasks.length} no total) ---`);
        if (this.tasks.length === 0) {
            console.log("[INFO] Nenhuma tarefa cadastrada.");
        } else {
            this.tasks.forEach((t, i) => console.log(` ${i + 1}. ${t}`));
        }
        return this.tasks;
    }
}

class DailyTasks extends TaskManager {

    constructor() {
        super();
        console.log("\n[Sistema] Gerenciador de Tarefas Diárias iniciado.");
    }

    public addTask(task: string): void {
        const trimmedTask = task.trim();
        if (this.isDuplicate(trimmedTask)) {
            console.log(`[ALERTA - Diárias] Tarefa duplicada ignorada: "${trimmedTask}"`);
            return;
        }

        this.tasks.push(trimmedTask);
        console.log(`[SUCESSO - Diárias] Tarefa adicionada: "${trimmedTask}"`);
    }

    public listTasks(): string[] {
        console.log(`\n--- Tarefas Diárias (${this.tasks.length} no total) ---`);
        if (this.tasks.length === 0) {
            console.log("[INFO] Nenhuma tarefa cadastrada.");
        } else {
            this.tasks.forEach((t, i) => console.log(` ${i + 1}. ${t}`));
        }
        return this.tasks;
    }
}
const projetoSite = new Project("Lançamento do Novo Site");
const tarefasDiarias = new DailyTasks();

projetoSite.addTask("Definir arquitetura de microserviços");
projetoSite.addTask("Desenvolver front-end da home page");
projetoSite.addTask("Desenvolver front-end da home page"); 
projetoSite.addTask("Revisão de código do back-end");

tarefasDiarias.addTask("Responder e-mails");
tarefasDiarias.addTask("Planejar reuniões da semana");
tarefasDiarias.addTask("Responder e-mails"); 
tarefasDiarias.addTask("Fazer exercício matinal");

projetoSite.listTasks();
tarefasDiarias.listTasks();