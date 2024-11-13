const request = require("supertest");
const app = require("./app");

describe("GET /horoscope", () => {
	test("Invalid data lenght", (done) => {
		request(app)
			.get("/horoscope")
			.expect("Content-Type", /json/)
			.send({
				bday: "invalid",
			})
			.expect(400)
			.expect((res) => {
				res.body.message = "Invalid date format : pls send according yyyy-mm-dd"
			});
	});
	
	test("Invalid date format", (done) => {
		request(app)
			.get("/horoscope")
			.expect("Content-Type", /json/)
			.send({
				bday: "1991-in-ds",
			})
			.expect(400)
			.expect((res) => {
				res.body.message = "Error while parsing date : pls send according yyyy-mm-dd"
			});
	});
	
	test("Invalid date", (done) => {
		request(app)
			.get("/horoscope")
			.expect("Content-Type", /json/)
			.send({
				bday: "1991-50-50",
			})
			.expect(400)
			.expect((res) => {
				res.body.message = "Invalid date entered"
			});
	});
	
	test("Valid", (done) => {
		request(app)
			.get("/horoscope")
			.expect("Content-Type", /json/)
			.send({
				bday: "1991-01-19",
			})
			.expect(200)
			.expect((res) => {
				res.body.sign = "Capricorn";
				res.body.zodiac = "Goat";
			});
	});
});