import {Testimonio} from "../models/Testimoniales.js";

const guardarTestimonio = async(req, res)=>{
    //validaciones
    const{ nombre, correo, comentario } = req.body;
    const errores = [];

    if(nombre === ''){
        errores.push({mensaje : 'El nombre esta vacio'});
    }
    if(correo === ''){
        errores.push({mensaje : 'El correo esta vacio'});
    }
    if(comentario === ''){
        errores.push({mensaje : 'El comentario esta vacio'});
    }
    
    if(errores.length > 0){
        //consultar testimonios existente
        const testimonios = await Testimonio.findAll();
        //mostrat la vista con errores
        res.render('testimonios', {
            pagina:'Testimonios',
            errores,
            nombre,
            correo,
            comentario,
            testimonios
        })
    }else{
        //registra en la bd
        try {
            await Testimonio.create({
                nombre,
                correo,
                comentario
            });
            res.redirect('/testimonios');
        } catch (error) {
            console.log(error)
        }
    }
}
export {guardarTestimonio};