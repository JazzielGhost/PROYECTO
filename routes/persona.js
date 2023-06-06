    const express = require('express');
    const router = express.Router();


    const checkEmail = require('../middleware/checkEmail');
    const personaService = require('../services/personaService')


    router.post('/register/torneo',async (req, res) => {
        const {nombre_torneo,tipo_torneo, fecha_inicio,cantidad_equipos,
             id_campo, id_trofeo_of} = req.body;                                 
        const [result] = await personaService.registerTorneo(nombre_torneo,tipo_torneo, fecha_inicio, //insertar datos en tabla TORNEO con el comando
            cantidad_equipos, id_campo, id_trofeo_of)             // (post) localhost:3000/persona/register/torneo
        if (result.affectedRows === 1)
            res.json({ code: 201, message: 'Datos guardados correctamente' });
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos' })
    })			

    router.post('/register/usuario',async (req, res) => { //(post) localhost:3000/persona/register/usuario
        const {nickname,nombre_usuario,
            primer_ap,segundo_ap,fecha_nacimiento
            ,email,password,fecha_entrada} = req.body;                               
        const [result] = await personaService.registerUsuario(nickname,nombre_usuario,
            primer_ap,segundo_ap,fecha_nacimiento
            ,email,password,fecha_entrada)             
        if (result.affectedRows === 1)
            //res.json({ code: 201, message: 'Datos guardados correctamente' });
            //res.redirect("fielder_community-oficial/index.html");
            //console.log(req.body)
            res.redirect('http://127.0.0.1:5500/desktop-web/project-fc/index.html')
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos' })
    })

    router.post('/register/equipo',async (req, res) => {
        const {nombre_equipo,dt_equipo,cantidad_jugadores,
            fecha_registro,id_torneo} = req.body;                               
        const [result] = await personaService.registerEquipo(nombre_equipo,dt_equipo//insertar datos en tabla EQUIPO con el comando
            ,cantidad_jugadores,fecha_registro,id_torneo)             // (post) localhost:3000/persona/register/EQUIPO
        if (result.affectedRows === 1)
            res.json({ code: 201, message: 'Datos guardados correctamente' });
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos' })
    })
        
    router.post('/register/jugador', checkEmail,async (req, res) => {
        const {nombre_jugador,primer_ap,fecha_entrada,id_equipo} = req.body;      //Existe mensaje que si el email esta repetido o no
        const [result] = await personaService.registerJugador(nombre_jugador,primer_ap//insertar datos en tabla JUGADOR con el comando
            ,fecha_entrada,id_equipo)// (post) localhost:3000/persona/register/jugador
        if (result.affectedRows === 1)
            res.json({ code: 201, message: 'Datos guardados correctamente' });    
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos' })
    })

    router.post('/register/dueno_torneo',async (req, res) => {
        const {nombre_dueño_torneo,primer_ap,
            fecha_nacimiento,id_torneo} = req.body;      //insertar datos en tabla DUEÑO DEL TORNEO con el comando
        const [result] = await personaService.registerDuenoTorneo(nombre_dueño_torneo,
            primer_ap,fecha_nacimiento,id_torneo)// (post) localhost:3000/persona/register/dueno_torneo
        if (result.affectedRows === 1) 
            res.json({ code: 201, message: 'Datos guardados correctamente' });
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos' })
    })

    /*router.post('/prestamo',async (req, res) => {                               //comando para prestamo
        const { cantidad, plazos, persona_curp, autorizado, fecha} = req.body; //(post) localhost:3000/persona/prestamo
        const [result] = await personaService.register2(cantidad, plazos, persona_curp, autorizado, fecha)
        if (result.affectedRows === 1)
            res.json({ code: 201, message: 'Datos guardados correctamente (prestamo)' });
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos (Abono)' })
    })*/

    /*router.post('/abono', async (req, res) => {         //comando para abono
        const { abono, fecha, prestamo_id} = req.body; // (post) localhost:3000/persona/abono
        const [result] = await personaService.register3(abono, fecha, prestamo_id)
        if (result.affectedRows === 1)
            res.json({ code: 201, message: 'Datos guardados correctamente (Abono)' });
        else
            res.json({ code: 400, message: 'Ocurrió un error al intentar guardar los datos (Abono)' })
    })*/


    router.post('/login/usuario', async (req, res) => {
        const { email, password } = req.body;                          //con el login se genera un token, para poder ver los datos de 
        try {                                                         //la tabla personas,prestamos y abonos.       
            //const data =
            await personaService.login(email, password);//el comando de login es 
            //res.json({ code: 200, message: '', data: data })        // (post) localhost:3000/persona/login/usuario
            res.redirect('http://127.0.0.1:5500/desktop-web/project-fc/index.html')
        } catch (e) {
            res.json({ code: 400, message: e.message })
        }
    })

    module.exports = router;