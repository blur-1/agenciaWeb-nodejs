import {Testimonio} from "../models/Testimoniales.js";

const guardarTestimonio = async(req, res)=>{
    //validando
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
        //consultar testimonios existentes
        const testimonios = await Testimonio.findAll();
        //mostrar la vista con los errores
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