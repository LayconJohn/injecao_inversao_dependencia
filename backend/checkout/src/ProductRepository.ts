import pgp from "pg-promise";


export default class ProductRepository {
    async getProduct(productId: number) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const [product] = await connection.query("select * from branas.product where product_id = $1", [productId]);
		await connection.$pool.end();
        return product;
    }
}