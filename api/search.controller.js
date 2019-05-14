

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
    const roomDuringDay = req.body.duringDay;
    const roomMinPrice = req.body.minPrice * 10000;
    const roomMaxPrice = req.body.maxPrice* 10000;
    const roomReservation = req.body.reservation;
    const roomType = req.body.type;
    const roomMaxPersonnel = req.body.people;
    
    
    Room.find({
        possibleDate : {$all : roomDuringDay },
        price : {$gte :roomMinPrice, $lte: roomMaxPrice},
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
    const name = '송파 방이';
    const type = "auto";
    const reservation = false;
    const maxPersonnel = 2;
    const price = 40000;
    const possibleDate = [20090601,20190602,20190603];
    Room.create({
        name: name,
        type: type,
        reservation :  reservation,
        maxPersonnel : maxPersonnel,
        possibleDate : possibleDate,
        price : price
    }, function(err, docs){
        if(err) return res.status(500).send('Room 생성 실패');
        return res.status(200).send('생성 성공');
    })
};

