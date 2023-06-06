const express = require("express");
//const mysql = require('mysql2/promise'); //conectar de HTML A BASE DE DAOTS

const postRouter = require("./routes/post");
const personaRouter = require("./routes/persona");

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(`/post`, postRouter);
app.use(`/persona`, personaRouter);

app.listen(PORT, () => {
	console.log('Connect to server 🖥️!!!!');
})


  