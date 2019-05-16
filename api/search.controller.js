

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
    const data = {
        "name" : "도봉산 글램",
        "type" : "glam",
        "reservation" : true,
        "maxPersonnel" : 3,
        "possibleDate" : [20190601,20190602,20190603,20190604,20190605,20190606,20190607,20190608,20190609,20190610],
        "price" : 60000
    }
    
    
    Room.create({
        name: data.name,
        type: data.type,
        reservation :  data.reservation,
        maxPersonnel : data.maxPersonnel,
        possibleDate : data.possibleDate,
        price : data.price
    }, function(err, docs){
        if(err) return res.status(500).send('Room 생성 실패');
        return res.status(200).send('생성 성공');
    })
};

