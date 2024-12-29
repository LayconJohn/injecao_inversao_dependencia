import { main } from "../src/main";

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
    
    const output = await main(input);

    expect(output.subtotal).toBe(0);
    expect(output.taxes).toBe(0);
    expect(output.freight).toBe(0);
    expect(output.total).toBe(0);


});