import CurrencyGateway from "./CurrencyGateway";
import { inject, Registry } from "./DI";
import ProductRepository from "./ProductRepository";
import ShoppingCart from "./ShoppingCart";

export class CalculateCheckout {
	@inject("currencyGateway")
	currencyGateway?: CurrencyGateway;
	@inject("productRepository") 
	productRepository?: ProductRepository;

	constructor() {

	}

	async execute(input: Input): Promise<Output> {
		const currency = await this.currencyGateway?.getCurrency(input.currency);
		if(!currency) throw new Error("Currency not found");
		const freight = 2.6;
		const protection = 9;
		const shoppingCart = new ShoppingCart(freight, protection, input.country);
		for (const item of input.items) {
			const product = await this.productRepository?.getProduct(item.productId);
			shoppingCart.addItem(parseFloat(product.amount), item.quantity)
		}
		
		shoppingCart.calculate();
		
		return {
			subtotal: Math.round(shoppingCart.subtotal * currency * 100)/100,
			taxes: Math.round(shoppingCart.taxes * currency * 100)/100,
			freight: Math.round(freight * currency * 100)/100,
			total: Math.round(shoppingCart.total * currency * 100)/100
		};
	}
}

type Input = {
	items: {productId: number, quantity: number}[],
	country: string,
	currency: string
}

type Output = {
	subtotal: number,
	taxes: number,
	freight: number,
	total: number
}
