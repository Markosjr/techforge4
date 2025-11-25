type InventoryMap = Record<string, number>;

abstract class Inventory {
    protected inventory: InventoryMap = {};
    public abstract addItem(item: string, quantity: number): void;

    public removeItem(item: string): void {
        const itemKey = item.trim().toLowerCase();
        if (this.inventory[itemKey] !== undefined) {
            delete this.inventory[itemKey]; 
            console.log(`[SUCESSO] Item '${item}' removido do inventário.`);
        } else {
            console.log(`[ALERTA] Item '${item}' não encontrado no inventário.`);
        }
    }
    public getInventory(): InventoryMap {
        return this.inventory;
    }
    protected displayInventory(name: string): void {
        console.log(`\n--- Inventário: ${name} (${Object.keys(this.inventory).length} Itens Únicos) ---`);
        if (Object.keys(this.inventory).length === 0) {
            console.log("[INFO] Inventário vazio.");
            return;
        }

        for (const item in this.inventory) {
            console.log(`- ${item.charAt(0).toUpperCase() + item.slice(1)}: ${this.inventory[item]} unidades`);
        }
    }
}

class WarehouseInventory extends Inventory {
    private warehouseName: string;

    constructor(name: string) {
        super();
        this.warehouseName = name;
        console.log(`\n[Sistema] Inventário de Armazém "${this.warehouseName}" iniciado.`);
    }

    public addItem(item: string, quantity: number): void {
        const itemKey = item.trim().toLowerCase();

        if (quantity <= 0) {
            console.log(`[ALERTA - ${this.warehouseName}] Quantidade deve ser positiva para adicionar.`);
            return;
        }

        const currentQuantity = this.inventory[itemKey] || 0;
        this.inventory[itemKey] = currentQuantity + quantity;

        console.log(`[SUCESSO - ${this.warehouseName}] Adicionado ${quantity} de '${item}'. Novo total: ${this.inventory[itemKey]}`);
    }

    public listInventory(): void {
        this.displayInventory(this.warehouseName);
    }
}


class StoreInventory extends Inventory {
    private storeName: string;
    private readonly MAX_QUANTITY_PER_ITEM: number = 10;

    constructor(name: string) {
        super();
        this.storeName = name;
        console.log(`\n[Sistema] Inventário de Loja "${this.storeName}" iniciado. Limite por item: ${this.MAX_QUANTITY_PER_ITEM}.`);
    }


    public addItem(item: string, quantity: number): void {
        const itemKey = item.trim().toLowerCase();

        if (quantity <= 0) {
            console.log(`[ALERTA - ${this.storeName}] Quantidade deve ser positiva para adicionar.`);
            return;
        }

        const currentQuantity = this.inventory[itemKey] || 0;
        const newTotal = currentQuantity + quantity;

        if (newTotal > this.MAX_QUANTITY_PER_ITEM) {
            const amountToAdd = this.MAX_QUANTITY_PER_ITEM - currentQuantity;

            if (amountToAdd > 0) {
                this.inventory[itemKey] = this.MAX_QUANTITY_PER_ITEM;
                console.log(`[AVISO - ${this.storeName}] Limite de 10 atingido. Adicionado ${amountToAdd} de '${item}'.`);
            } else {
                console.log(`[ALERTA - ${this.storeName}] '${item}' já está no limite (${this.MAX_QUANTITY_PER_ITEM}). Nada adicionado.`);
            }

        } else {
            this.inventory[itemKey] = newTotal;
            console.log(`[SUCESSO - ${this.storeName}] Adicionado ${quantity} de '${item}'. Novo total: ${newTotal}`);
        }
    }

    public listInventory(): void {
        this.displayInventory(this.storeName);
    }
}


const armazemCentral = new WarehouseInventory("Central RJ");
const lojaPrincipal = new StoreInventory("Shopping Leblon");

armazemCentral.addItem("TV LED 55'", 50);
armazemCentral.addItem("Cafeteira Expresso", 120);
armazemCentral.addItem("TV LED 55'", 30); 
armazemCentral.listInventory();

lojaPrincipal.addItem("TV LED 55'", 5);
lojaPrincipal.addItem("Cafeteira Expresso", 8);

lojaPrincipal.addItem("TV LED 55'", 7);

lojaPrincipal.addItem("Cafeteira Expresso", 5);

lojaPrincipal.listInventory();

armazemCentral.removeItem("Cafeteira Expresso");
armazemCentral.listInventory();

lojaPrincipal.removeItem("Monitor 27'"); 