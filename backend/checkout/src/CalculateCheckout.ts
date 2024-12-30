import CurrencyGateway from "./CurrencyGateway";
import { Registry } from "./DI";
import ProductRepository from "./ProductRepository";

export class CalculateCheckout {
	currencyGateway: CurrencyGateway;
	productRepository: ProductRepository;

	constructor() {
		this.currencyGateway = Registry.getInstance().inject("currencyGateway");
		this.productRepository = Registry.getInstance().inject("productRepository");
	}

	async execute(input: Input): Promise<Output> {
		const currency = await this.currencyGateway.getCurrency(input.currency);
		let subtotal = 0;
		const freight = 2.6;
		const protection = 9;
		for (const item of input.items) {
			const product = await this.productRepository.getProduct(item.productId)
			const amount = parseFloat(product.amount);
			const itemAmount = item.quantity * amount;
			subtotal += itemAmount;
		}
		let taxes = 0;
		if (input.country === "BR") {
			if (subtotal + freight + protection > 50) {
				const importTax = ((subtotal + freight + protection) * 0.60); // imposto de importação sobre produto + frete + seguro
				const ICMS = (subtotal + freight + protection + importTax) * 0.17; // ICMS sobre produto + frete + seguro imposto de importação
				taxes = importTax + ICMS;
			} else {
				taxes = (subtotal + freight) * 0.17; // ICMS sobre o produto + frete
			}
		}
		const total = subtotal + taxes + freight;
		return {
			subtotal: Math.round(subtotal * currency * 100)/100,
			taxes: Math.round(taxes * currency * 100)/100,
			freight: Math.round(freight * currency * 100)/100,
			total: Math.round(total * currency * 100)/100
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
