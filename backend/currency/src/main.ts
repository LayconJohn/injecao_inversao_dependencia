import express from "express";
const app = express();
app.get("/currencies", function (req, res) {
	res.json({
		USD: 1,
		BRL: 6.1930,
		EUR: 0.94
	})
})
app.listen(3000);