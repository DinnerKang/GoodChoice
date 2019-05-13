const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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
    console.log('서버 시작');
});