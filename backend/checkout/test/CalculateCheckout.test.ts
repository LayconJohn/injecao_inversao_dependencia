import { CalculateCheckout } from "../src/CalculateCheckout";
import CurrencyGateway, { CurrencyGatewayHTTP } from "../src/CurrencyGateway";
import ProductRepository from "../src/ProductRepository";

let calculateCheckout: CalculateCheckout;

beforeEach(() => {
    const currencyGateway = new CurrencyGatewayHTTP();
    const productRepository = new ProductRepository()
    calculateCheckout = new CalculateCheckout(currencyGateway, productRepository);
})
test("Deve adicionar um pedidos com um ou mais itens adicionados", async () => {
    const input = {
        items: [
            {
                productId: 1,
                quantity: 1
            },
            {
                productId: 2,
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