const express = require('express');
const router = express.Router();

const postService = require('../services/postService')
const { verifyToken } = require('../middleware/authJwt');

router.get("/usuario", async (req, res) => {		//mostrar todos los datos con el comando
	[results] = await postService.getAllUsuario();                //(Get) localhost:3000/post/usuario 
	res.json({ code: 200, message: '', data: results });   
})

router.get("/torneo", async (req, res) => {		//mostrar todos los datos con el comando
	[results] = await postService.getAllTorneo();                //(Get) localhost:3000/post/torneo 
	res.json({ code: 200, message: '', data: results });   
})

router.get("/torneo/:nombre_torneo", async (req, res) => {	//buscar datos por medio del  nombre_torneo
	const nombre_torneo = req.params.nombre_torneo;						   //con el comando  (Get)localhost:3000/post/torneo/(nombre del torneo a buscar)
	[results] = await postService.getNombreTorneo(nombre_torneo);
	res.json({ code: 200, message: '', data: results });
})

router.get("/jugador", verifyToken, async (req, res) => {		//mostrar todos los datos con el comando
	[results] = await postService.getAllJugador();                //(Get) localhost:3000/post/jugador 
	res.json({ code: 200, message: '', data: results });  //NOTA: se necesita token para acceder a la informacion
})

router.get("/jugador/:nombre_jugador", async (req, res) => {	//buscar datos por medio del  nombre_torneo
	const nombre_jugador = req.params.nombre_jugador;						   //con el comando  (Get)localhost:3000/post/jugador/(nombre del jugador a buscar)
	[results] = await postService.getNicknameJugador(nombre_jugador);			  
	res.json({ code: 200, message: '', data: results });
})

//DESICION INCONCLUSA
//MEJOR FORMA DE REALIZARLO, DEBIDO A QUE SE ENTIENDE MEJOR
/*
router.post('/', async (req, res) => {
	const curp = req.body.curp; const nombre = req.body.nombre;
	const primer_ap = req.body.primer_ap; const calle_principal = req.body.calle_principal;
	const colonia = req.body.colonia; const cp = req.body.cp;			//Existe mensaje si el curp esta repetido o no
	const num_ext = req.body.num_ext; const ciudad = req.body.ciudad;  //Existe mensaje que si el email esta repetido o no
	const telefono = req.body.telefono; const email = req.body.email; //insertar datos en tabla persona con el comando
	const password = req.body.password;								 // (post) localhost:3000/persona/register																	
	[results] = await postService.insertPersonas(curp, nombre, primer_ap, calle_principal, colonia, cp, num_ext, ciudad, telefono, email, password);
	if (results.affectedRows === 1)
		res.json({ code: 201, message: 'Datos guardados correctamente' });
	else
		res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos' })
});*/
/*
router.get("/prestamos", verifyToken,async (req, res) => {	//mostrar todos los datos de prestamos
	[results] = await postService.getAll2(); 			   //con el comando (Get)localhost:3000/post/prestamos				
	res.json({ code: 200, message: '', data: results });  //NOTA: se necesita token para acceder a la informacion
})

router.get("/prestamos/persona_curp/:persona_curp", verifyToken,async (req, res) => {
	const persona_curp = req.params.persona_curp;		  //buscar datos prestamo por medio de persona_curp
	[results] = await postService.get2(persona_curp);    //con el comando (Get) localhost:3000/post/prestamos/persona_curp/(PERSONA_CURP A BUSCAR)
	res.json({ code: 200, message: '', data: results });//Se mostrara todos los prestamos que tiene por medio de persona_curp
})													   //NOTA: se necesita token para acceder a la informacion

router.get("/prestamos/id/:id", verifyToken,async (req, res) => {
	const id = req.params.id;								//buscar datos prestamos por medio de id unico
	[results] = await postService.getid(id);	      	   //el comando es localhost:3000/post/prestamos/id/(id a buscar)
	res.json({ code: 200, message: '', data: results });  //NOTA: se necesita token para acceder a la informacion
})

router.post('/abono',async (req, res) => {
	const abono = req.body.abono;
	const fecha = req.body.fecha; 
	const prestamo_id = req.body.prestamo_id; 								//insertar abonos
	[results] = await postService.insertAbonos(abono, fecha, prestamo_id); // (post) localhost:3000/persona/abono
	if (results.affectedRows === 1)
		res.json({ code: 201, message: 'Datos guardados correctamente' });
	else
		res.json({ code: 400,  message: 'Ocurrió un error al intentar guardar los datos' })
});

router.get("/abonos", verifyToken,async (req, res) => {		//mostrar todos los datos de abonos
	[results] = await postService.getAll3();			   //con el comando (Get) localhost:3000/post/abonos 
	res.json({ code: 200, message: '', data: results });  //NOTA: se necesita token para acceder a la informacion
})

router.get("/abonos/prestamo_id/:prestamo_id", verifyToken,async (req, res) => {
	const prestamo_id = req.params.prestamo_id;					//buscar datos abonos por medio de prestamo_id
	[results] = await postService.getprestamo_id(prestamo_id); //con el comando (Get) localhost:3000/post/abonos/prestamo_id/(PRESTAMO_ID A BUSCAR)
	res.json({ code: 200, message: '', data: results });      //NOTA: se necesita token para acceder a la informacion
})														     //Se mostrara todos los abonos que tiene por medio de prestamo_id

*/

router.delete('/nickname/:nickname', verifyToken,async (req, res) => {//eliminar JUGADOR por medio del nickname
	const nickname = req.params.nickname;                            //con el comando (Delete) localhost:3000/post/nickname/(nickname A ELIMINAR)
	[results] = await postService.removeJugador(nickname); 			//NOTA: se necesita token para eliminar usuario		
	if (results.affectedRows === 1)			   							
		res.json({ code: 200, message: 'Datos eliminados correctamente' });
	else
		res.json({ code: 200, message: 'Recurso no encontrado' })
});

module.exports = router;