
interface User {
    id: number;
    name: string;
    email: string;
}
console.log("--- UserManager V1: Monolítica (Criação e Notificação) ---");

class UserManagerV1 {
    private users: User[] = [];
    private nextId: number = 1;


    public createUser(name: string, email: string): User {
        const newUser: User = {
            id: this.nextId++,
            name: name,
            email: email
        };

        this.users.push(newUser);
        console.log(`[V1] Usuário criado: ID ${newUser.id}, Nome: ${name}`);

        this.sendWelcomeEmail(newUser.email, newUser.name);

        return newUser;
    }

    private sendWelcomeEmail(email: string, name: string): void {
        console.log(`[V1 - Email Logic] Conectando ao servidor SMTP...`);
        console.log(`[V1 - Email Logic] E-mail enviado para ${email}: "Bem-vindo(a), ${name}!"`);
    }

    public listUsers(): void {
        console.log("\n[V1] Lista de Usuários:");
        this.users.forEach(u => console.log(`  ID: ${u.id} | Nome: ${u.name} | Email: ${u.email}`));
    }
}

console.log("\n--- UserManager V2: Refatorada (Baixo Acoplamento) ---");

class EmailNotification {
    private isConnected: boolean = false;

    constructor() {
        this.connect();
    }

    private connect(): void {
        this.isConnected = true;
        console.log(`[EmailNotification] Conectado ao serviço de e-mail.`);
    }


    public sendEmail(recipientEmail: string, subject: string, body: string): boolean {
        if (!this.isConnected) {
            console.error("[EmailNotification] Erro: Serviço não conectado.");
            return false;
        }
        console.log(`[EmailNotification] Enviando: Para: ${recipientEmail} | Assunto: ${subject}`);
        return true;
    }
}

class UserManagerV2 {
    private users: User[] = [];
    private nextId: number = 1;

    private notificationService: EmailNotification;


    constructor(notificationService: EmailNotification) {
        this.notificationService = notificationService;
        console.log("[V2] Gerenciador de Usuários iniciado, pronto para usar o serviço de notificação.");
    }

    public createUser(name: string, email: string): User {
        const newUser: User = {
            id: this.nextId++,
            name: name,
            email: email
        };

        this.users.push(newUser);
        console.log(`[V2] Usuário criado: ID ${newUser.id}, Nome: ${name}`);

        const subject = "Bem-vindo à Plataforma!";
        const body = `Olá ${name}, obrigado por se cadastrar!`;
        this.notificationService.sendEmail(newUser.email, subject, body);

        return newUser;
    }

    public listUsers(): void {
        console.log("\n[V2] Lista de Usuários:");
        this.users.forEach(u => console.log(`  ID: ${u.id} | Nome: ${u.name} | Email: ${u.email}`));
    }
}

const manager1 = new UserManagerV1();
manager1.createUser("Alice Monolítica", "alice@v1.com");
manager1.createUser("Bob Monolítico", "bob@v1.com");
manager1.listUsers();


const emailService = new EmailNotification();

const manager2 = new UserManagerV2(emailService);

manager2.createUser("Carla Refatorada", "carla@v2.com");
manager2.createUser("David Refatorado", "david@v2.com");
manager2.listUsers();
