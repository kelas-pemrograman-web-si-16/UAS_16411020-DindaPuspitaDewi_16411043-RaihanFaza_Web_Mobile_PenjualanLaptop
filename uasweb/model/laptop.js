const mongoose = require('mongoose');
const laptopSchema = mongoose.Schema({
    kodelaptop        : {type: String, unique: true},
    merklaptop 		: String,
    tipelaptop 	    : String,
    warna	        : String,
    harga	        : String,
    created_at		: String
});
module.exports = mongoose.model('laptop', laptopSchema);
