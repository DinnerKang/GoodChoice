const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const databaseUrl = 'mongodb://14.38.25.223:27017/gram';

const app = express();
const port = 5000;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// 요청 테스트
app.get('/', (req, res) => {
    res.send('Hello gram');
});
app.use('/search', require('./api/search'));

app.listen(port, () => {
  //  connectDB();
    console.log('서버 시작');
});


function connectDB(){
	let database;
	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	database.on('error', function(){
		console.log('데이터베이스 연결 실패');
	});
	database.on('open', function(){
		console.log('데이터베이스 연결 성공');
	});
}