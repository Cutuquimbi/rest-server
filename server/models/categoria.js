const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    }
});



module.exports = mongoose.model('Categoria', categoriaSchema);