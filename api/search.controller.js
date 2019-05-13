

// 가데이터
let modelData = require('../models/data.json');

// 전체 데이터 검색
exports.searchAll = (req, res) =>{
	return res.status(200).send(modelData);
};

// 특정 데이터 검색

exports.searchData = (req, res) =>{
    return res.status(200).send('test');
}