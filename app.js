const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet')

const hitterRouter = require('./routes/hitter');
const pitcherRouter = require('./routes/pitcher');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use('/api/player/hitter', hitterRouter);
app.use('/api/player/pitcher', pitcherRouter);

app.listen(3001, () => {
  console.log('server listening on http://localhost:3001');
})
