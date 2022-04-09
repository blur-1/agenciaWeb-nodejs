import Sequelize from 'sequelize'
import db from '../config/db.js'

export const Testimonio = db.define('testimoniales', {
   nombre:{
      type: Sequelize.STRING
   },
   correo:{
      type: Sequelize.STRING
   },
   comentario:{
      type: Sequelize.STRING     
   }
});