

// 가데이터
let modelData = require('../models/data.json');
const Room = require('../models/Room');

// 전체 데이터 검색
exports.searchAll = (req, res) =>{
    Room.find( {}, function(err, docs){
		if(err) return res.status(500).send('Room 조회 실패');
		return res.status(200).send(docs);
	});
};

// 특정 데이터 검색
exports.searchRooms = (req, res) =>{
    const roomDate = req.body.reservationDate;
    const roomReservation = req.body.reservation;
    const roomType = JSON.parse(req.body.type).type;
    const roomMaxPersonnel = req.body.maxPersonnel;
    const roomPrice = req.body.price;

    console.log(roomType);
    Room.find({
        reservation : roomReservation,
        type : {$in : roomType},
        maxPersonnel : {$lte: roomMaxPersonnel},
    }, function(err, docs){
        if(err) return res.status(500).send('Room 검색 실패');
        return res.status(200).send(docs);
    });
    
}

// Room 추가
exports.insertRoom = (req, res) =>{
    Room.create({
        name: req.body.name,
        type: req.body.type,
        reservation :  req.body.reservation,
        maxPersonnel : req.body.maxPersonnel,
        possibleDate : req.body.possibleDate,
        price : req.body.price
    }, function(err, docs){
        if(err) return res.status(500).send('Room 생성 실패');
        return res.status(200).send('생성 성공');
    })
};

