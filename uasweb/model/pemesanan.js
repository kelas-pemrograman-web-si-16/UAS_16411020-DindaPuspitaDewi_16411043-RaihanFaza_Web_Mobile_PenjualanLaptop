const mongoose = require('mongoose');
const pemesananSchema = mongoose.Schema({
    kodepemesan         : {type: String, unique: true},
    nama         		: String,
    notelp 	            : String,
    kodelaptop	        : String,
    created_at		    : String
});
module.exports = mongoose.model('pemesanan', pemesananSchema);
