import { Viaje } from "../models/Viaje.js";
import { Testimonio } from "../models/Testimoniales.js";

const paginaInicio = async (req,res) =>{
    //consultar 3 viajes del modelo
    const promiseBd = [];
    promiseBd.push( Viaje.findAll({ limit:3 }) );
    promiseBd.push( Testimonio.findAll({ limit:3 }) );

    try { 
        const resultado = await Promise.all( promiseBd);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        });
    } catch (error) {
        
    }
  
}
const paginaNosotros = (req,res) =>{
    res.render('nosotros',{
        pagina: 'Nosotros'
    });
}
const paginaViajes = async (req,res) =>{ 
    //consultamos la bd
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes,
    });
}
const paginaTestimonios = async (req, res)=>{
    try {
        const testimonios = await Testimonio.findAll();
        res.render('testimonios', {
            pagina:'Testimonios',
            testimonios
        });
    } catch (error) {
        console.log(error);
    }
    
}
// muestra viaje por  / slug
const paginaInfoViaje = async (req,res)=>{
    const { slug } = req.params;
    try{
        const viaje = await Viaje.findOne( { where : { slug }} );
        res.render('viaje',{
            pagina:'Informacion detallada del Viaje',
            viaje
        })
    }catch(error){
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaInfoViaje
}