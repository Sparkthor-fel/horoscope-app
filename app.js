const express = require('express');

const app = express();
const PORT = 3000;

import { getSign, getZodiac } from 'horoscope';

app.use(express.json());

app.get('/', (req, res) => {
	const birthday = req.body.bday;
	
	if (birthday.lenght != 10) {
		res.status(400).send("Invalid date format : pls send according yyyy-mm-dd");
	}
	
	const year = parseInt(bdate.substring(0,4));
	const month = parseInt(bdate.substring(5,7));
	const day = parseInt(bdate.substring(8,10));
	
	if (isNaN(year) || isNaN(month) || isNaN(day)){
		res.status(400).send("Error while parsing date : pls send according yyyy-mm-dd");
	}
	
	const sign = horoscope.getSign(month, day, true);
	const zodiac = horoscope.getZodiac(year, true);
	
	if (sign === null || zodiac === null) {
		res.status(400).send("Invalid date entered");
	}
	
	res.status(200).send({sign: sign, zodiac: zodiac});
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, 
                   and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
