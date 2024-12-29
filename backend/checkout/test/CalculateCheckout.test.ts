import { CalculateCheckout } from "../src/CalculateCheckout";

let calculateCheckout: CalculateCheckout;

beforeEach(() => {
    calculateCheckout = new CalculateCheckout();
})
test("Deve adicionar um pedidos com um ou mais itens adicionados", async () => {
    const input = {
        items: [
            {
                producId: 1,
                quantity: 1
            },
            {
                producId: 2,
                quantity: 2
            },
        ],
        country: "BR",
        currency: "BRL"
    };
    
    const output = await calculateCheckout.execute(input);

    expect(output.subtotal).toBe(687.98);
    expect(output.taxes).toBe(653.87);
    expect(output.freight).toBe(13.87);
    expect(output.total).toBe(1355.72);


});