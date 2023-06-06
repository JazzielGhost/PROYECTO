const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/secret')
const TABLE = 'TORNEO';
const TABLE2 = 'EQUIPO';
const TABLE3 = 'JUGADOR';
const TABLE4 = 'DUEÑO_TORNEO';
const TABLE5 = 'USUARIO';

const saltRounds = 10;

const registerUsuario = async (nickname,nombre_usuario,primer_ap,segundo_ap,fecha_nacimiento,email,password,fecha_entrada) => {
	const fechaUsuario = new Date();
	const hashPwd = await bcrypt.hash(password, saltRounds);
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE5}(nickname,nombre_usuario,primer_ap,segundo_ap,fecha_nacimiento,email,password,fecha_entrada) VALUE(?,?,?,?,?,?,?,?)`;
	return conn.execute(query, [nickname,nombre_usuario,primer_ap,segundo_ap,fecha_nacimiento,email,hashPwd,fechaUsuario ]);
}

const registerTorneo = async (nombre_torneo,tipo_torneo, fecha_inicio, cantidad_equipos, id_campo, id_trofeo_of) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE}(nombre_torneo,tipo_torneo, fecha_inicio,cantidad_equipos, id_campo, id_trofeo_of) VALUE(?, ?, ?, ?, ?, ? )`;
	return conn.execute(query, [nombre_torneo,tipo_torneo, fecha_inicio,cantidad_equipos, id_campo, id_trofeo_of]);
}

const registerEquipo = async (nombre_equipo,dt_equipo,cantidad_jugadores,fecha_registro,id_torneo) => {
	const fechaEquipo = new Date();
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE2}(nombre_equipo,dt_equipo,cantidad_jugadores,fecha_registro,id_torneo) VALUE(?,?, ?, ?, ?)`;
	return conn.execute(query, [nombre_equipo,dt_equipo,cantidad_jugadores,fechaEquipo,id_torneo]);
}

const registerJugador = async (nombre_jugador,primer_ap,fecha_entrada,id_equipo) => {
	const fechaJugador = new Date();
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE3}(nombre_jugador,primer_ap,fecha_entrada,id_equipo) VALUE(?,?,?,?)`;
	return conn.execute(query, [nombre_jugador,primer_ap,fechaJugador,id_equipo ]);
}
const registerDuenoTorneo = async (nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE4}(nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo) VALUE(?, ?, ?,?)`;
	return conn.execute(query, [nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo]);
}

const login = async (email, password) => {
	const query = 'SELECT * FROM USUARIO WHERE email = ?';  //LOGIN DE DE LA TABLA  USUARIO
	const conn = await db.getConnection();
	const [[result]] = await conn.execute(query, [email]) 

	if (!result)
		throw new Error('Usuario no registrado');
	const isValidPassword = await bcrypt.compare(password, result.password);
	if (!isValidPassword)
		throw new Error('Usuario o contraseña incorrectos');
	const token = jwt.sign({ id: result.id }, SECRET, {
		expiresIn: 60 * 60
	})
	return { token: token, userId: result.id };
}

const existEmail = async (email) => {  	//SI EXISTE EL EMAIL DE LA TABLA USUARIO
	const conn = await db.getConnection();
	const query = `SELECT COUNT(*) as total FROM ${TABLE5} WHERE email = ?`;
	const [[result]] = await conn.execute(query, [email]);
	if (result.total > 0)
		throw new Error('El email ya se encuentra registrado');
}
/*
const existCurp = async (curp) => {
	const conn = await db.getConnection();
	const query = `SELECT COUNT(*) as total FROM ${TABLE} WHERE curp = ?`;
	const [[result]] = await conn.execute(query, [curp]);
	if (result.total > 0)
		throw new Error('El curp ya se encuentra registrado');
}
*/


exports.registerUsuario = registerUsuario;
//exports.existPlazos = existPlazos;
//exports.existCurp = existCurp;
exports.existEmail = existEmail;
exports.registerTorneo = registerTorneo;
exports.registerEquipo = registerEquipo;
exports.registerJugador = registerJugador;
exports.registerDuenoTorneo = registerDuenoTorneo;
exports.login = login;