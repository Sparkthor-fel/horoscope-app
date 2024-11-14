const express = require('express');

const app = express();
const PORT = 3000;

const getSign = require('horoscope').getSign;
const getZodiac = require('horoscope').getZodiac;

app.use(express.json());

app.get('/horoscope', (req, res) => {
	let birthdate = req.query.bday;
	if (birthdate == undefined){
		res.status(400).send("Send your birthdate at query param bday=yyyy-mm-dd to use horoscpe");
		return;
	}
	
	if (birthdate.length != 10) {
		res.status(400).send("Invalid date format : pls send according yyyy-mm-dd");
		return;
	}
	
	let year = parseInt(birthdate.substring(0,4));
	let month = parseInt(birthdate.substring(5,7));
	let day = parseInt(birthdate.substring(8,10));
	
	if (isNaN(year) || isNaN(month) || isNaN(day)){
		res.status(400).send("Error while parsing date : pls send according yyyy-mm-dd");
		return;
	}
	
	let sign = getSign({ month: month, day: day }, true);
	let zodiac = getZodiac(year, true);
	
	if (sign === null || zodiac === null) {
		res.status(400).send("Invalid date entered");
		return;
	}
	res.status(200).send({sign: sign, zodiac: zodiac});
});

app.listen(PORT, (error) =>{
	if(!error){
		console.log("Server is Successfully Running, and App is listening on port "+ PORT);
	}
	else{
		console.log("Error occurred, server can't start", error);
	}
});

module.exports = app;
