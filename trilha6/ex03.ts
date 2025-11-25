interface Contact {
    name: string;
    email: string;
}

console.log("--- EmailSender V1: Monolítica (Envio e Validação) ---");

class EmailSenderV1 {
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public sendEmail(contact: Contact, subject: string, body: string): boolean {
        console.log(`[V1] Tentando enviar email para ${contact.name} (${contact.email})...`);

        if (!this.isValidEmail(contact.email)) {
            console.log(`[V1 - ERRO] Falha na validação do e-mail: '${contact.email}'`);
            return false;
        }

        console.log(`[V1 - SUCESSO] E-mail enviado com sucesso! Assunto: "${subject}"`);
        return true;
    }
}

console.log("\n--- EmailSender V2: Refatorada (Baixo Acoplamento) ---");

class ContactValidator {
   
    public isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        console.log(`[Validator] Validando e-mail '${email}': ${isValid ? 'Válido' : 'Inválido'}`);
        return isValid;
    }
    public isValidName(name: string): boolean {
        return name.trim().length > 0;
    }
}

class EmailSenderV2 {
    private validator: ContactValidator;
    constructor(validator: ContactValidator) {
        this.validator = validator;
        console.log("[V2] EmailSender iniciado, dependente do ContactValidator.");
    }

    public sendEmail(contact: Contact, subject: string, body: string): boolean {
        console.log(`[V2] Tentando enviar email para ${contact.name} (${contact.email})...`);

        if (!this.validator.isValidEmail(contact.email) || !this.validator.isValidName(contact.name)) {
            console.log("[V2 - ERRO] Envio abortado devido a falha na validação do contato.");
            return false;
        }

        console.log(`[V2 - SUCESSO] E-mail enviado com sucesso! Assunto: "${subject}"`);
        return true;
    }
}
const sender1 = new EmailSenderV1();
console.log("\n--- Teste V1 (Monolítica) ---");
sender1.sendEmail({ name: "Joana", email: "joana@email.com" }, "Inscrição", "Obrigada por se inscrever!"); 
sender1.sendEmail({ name: "Invalido", email: "invalido@" }, "Teste", "E-mail ruim"); 


const validator = new ContactValidator(); 
const sender2 = new EmailSenderV2(validator); 

console.log("\n--- Teste V2 (Refatorada) ---");
sender2.sendEmail({ name: "Pedro", email: "pedro.souza@mail.co" }, "Nova Conta", "Sua conta foi criada."); 
sender2.sendEmail({ name: "Falha", email: "falha-nao-tem-arroba.com" }, "Teste", "E-mail muito ruim"); 