const db = require('../database/db');
const TABLE = 'TORNEO';
const TABLE2 = 'EQUIPO';
const TABLE3 = 'JUGADOR';
const TABLE4 = 'DUEÑO_TORNEO';
const TABLE5 = 'INFORMACION_TORNEOS';
const TABLE6 = 'USUARIO';

const getAllUsuario = async () => {
	const conn = await db.getConnection(); //todos los datos: tabla USUARIO
	const query = `SELECT * FROM ${TABLE6}`;
	return conn.execute(query);
}

const getAllTorneo = async () => {
	const conn = await db.getConnection(); //todos los datos: tabla TORNEO
	const query = `SELECT * FROM ${TABLE}`;
	return conn.execute(query);
}

const getAllEquipo = async () => { //todos los datos: tabla EQUIPO
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE2}`;
	return conn.execute(query);
}

const getAllJugador = async () => { //todos los datos: tabla JUGADOR
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE3}`;
	return conn.execute(query);
}
const getAllInformacionTrofeos = async () => { //todos los datos: tabla INFORMACION TROFEOS
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE5}`;
	return conn.execute(query);
}

const getNicknameJugador = async (nickname) => {
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE3} WHERE nickname = ?`; //obtener datos de JUGADOR por medio del nickname
	return conn.execute(query, [nickname]);
}

const getNombreTorneo = async (nombre_torneo) => {
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE} WHERE nombre_torneo = ?`; //obtener datos del TORNEO por medio del nombre_torneo
	return conn.execute(query, [nombre_torneo]);
}

const getNombreEquipo = async (nombre_equipo) => {
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE2} WHERE nombre_equipo = ?`; //obtener datos  de EQUIPO por medio del nombre del equipo
	return conn.execute(query, [nombre_equipo]);
}
/*
const save = async (prestamos, abonos) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE}(prestamos, abonos) VALUE(?, ?)`;
	return conn.execute(query, [prestamos, abonos]);
}
*/
/*
const insertTorneo = async (nombre_torneo,tipo_torneo, fecha_inicio,cantidad_equipos, id_campo, id_trofeo_of) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE}(nombre_torneo,tipo_torneo, fecha_inicio,cantidad_equipos, id_campo, id_trofeo_of) VALUE(?, ?, ?, ?, ?)`;
	console.log(nombre_torneo,tipo_torneo, fecha_inicio, cantidad_equipos, id_campo, id_trofeo_of)
	return await conn.execute(query, [nombre_torneo,tipo_torneo, fecha_inicio, cantidad_equipos, id_campo, id_trofeo_of]);
}

const insertEquipo = async (nombre_equipo,dt_equipo,cantidad_jugadores,fecha_registro,id_torneo) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE2}(nombre_equipo,dt_equipo,cantidad_jugadores,fecha_registro,id_torneo)
	VALUE(?, ?, ?, ?, ?)`;
	console.log(nombre_equipo,dt_equipo,cantidad_jugadores,fecha_registro,id_torneo)
	return await conn.execute(query, [nombre_equipo,dt_equipo,cantidad_jugadores,fecha_registro,id_torneo]);
}

const insertJugador = async (nickname,nombre_jugador,primer_ap,fecha_nacimiento,email,password,fecha_entrada,id_equipo) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE3}(nickname,nombre_jugador,primer_ap,fecha_nacimiento,email,password,fecha_entrada,id_equipo)
	VALUE(?, ?, ?,?, ?, ?, ?, ?, ?)`;
	console.log(nickname,nombre_jugador,primer_ap,fecha_nacimiento,email,password,fecha_entrada,id_equipo)
	return await conn.execute(query, [nombre_jugador,primer_ap,fecha_nacimiento,email,password,fecha_entrada,id_equipo]);
}
const insertDuenoTorneo = async (nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE4}(nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo)
	VALUE(?, ?, ?, ?)`;
	console.log(nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo)
	return await conn.execute(query, [nombre_dueño_torneo,primer_ap,fecha_nacimiento,id_torneo]);
}
*/
//FALTA
const removeJugador = async (nickname) => {
	const conn = await db.getConnection();
	const query = `DELETE FROM ${TABLE3} WHERE nickname = ?`;
	return conn.execute(query, [nickname]);
}

exports.getAllUsuario = getAllUsuario
exports.getNombreTorneo = getNombreTorneo;
exports.getAllTorneo = getAllTorneo;
exports.getAllEquipo = getAllEquipo;
exports.getAllJugador = getAllJugador;
exports.getAllInformacionTrofeos = getAllInformacionTrofeos;
exports.getNicknameJugador = getNicknameJugador;
exports.getNombreEquipo = getNombreEquipo;
//exports.save = save;
exports.removeJugador = removeJugador;
/*
exports.insertTorneo = insertTorneo;
exports.insertEquipo = insertEquipo;
exports.insertJugador = insertJugador;
exports.insertDuenoTorneo = insertDuenoTorneo;
*/