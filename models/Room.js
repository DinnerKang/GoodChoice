let mongoose = require('mongoose');

let RoomSchema = mongoose.Schema({
	name: {type :String, required: true},
    type: {type :String},
    reservation :  {type :Boolean},
    maxPersonnel : {type : Number },
    possibleDate : {type : [Number] },
    price : {type : Number}
});

mongoose.model('rooms',RoomSchema);

module.exports = mongoose.model('rooms');