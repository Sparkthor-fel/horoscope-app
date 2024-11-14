const request = require("supertest");
const app = require("./app");


describe("GET /horoscope", () => {
	it("Invalid data lenght", async () => {
		const res = await request(app)
			.get("/horoscope")
			.query({
				bday: "invalid",
			});
		expect(res.statusCode).toEqual(400);
		expect(res.text).toEqual("Invalid date format : pls send according yyyy-mm-dd");
	});
	
	it("Invalid date format", async () => {
		const res = await request(app)
			.get("/horoscope")
			.query({
				bday: "1991-in-ds",
			});
		expect(res.statusCode).toEqual(400);
		expect(res.text).toEqual("Error while parsing date : pls send according yyyy-mm-dd");
	});
	
	it("Invalid date", async () => {
		const res = await request(app)
			.get("/horoscope")
			.query({
				bday: "1991-50-50",
			});
		expect(res.statusCode).toEqual(400);
		expect(res.text).toEqual("Invalid date entered");
	});
	
	it("Valid", async () => {
		const res = await request(app)
			.get("/horoscope")
			.query({
				bday: "1991-01-19",
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body.sign).toEqual("Capricorn");
		expect(res.body.zodiac).toEqual("Goat");
	});
});