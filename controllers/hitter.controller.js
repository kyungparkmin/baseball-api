const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

const this_season = {
  '년도':'',
  '경기수':'',
  '타석':'',
  '타수':'',
  '득점':'',
  '안타':'',
  '2루타':'',
  '3루타':'',
  '홈런':'',
  '루타':'',
  '타점':'',
  '도루':'',
  '도실':'',
  '볼넷':'',
  '사구':'',
  '고4':'',
  '삼진':'',
  '병살':'',
  '희타':'',
  '희비':'',
  '타율':'',
  '출루율':'',
  '장타율':'',
  'OPS':'',
  'WRC+':'',
  'WAR*':'',
};

const total_season = this_season;

const getHitterData = async (req, res) => {
  const name = req.params.name;
  const URL = encodeURI(`http://www.statiz.co.kr/player.php?name=${name}`);
  try {
    await axios({
      url : URL,
      method : "GET",
      responseType : "arraybuffer",
    }).then(async (html) => {
      const content = iconv.decode(html.data, "UTF-8").toString();

      const $ = cheerio.load(content);

      $('table tbody .oddrow_stz0:nth-of-type(3)').map((i, element) => {
        this_season['년도'] = String($(element).find('td:nth-of-type(2) span').text());
        this_season['경기수'] = String($(element).find('td:nth-of-type(6) span').text());
        this_season['타석'] = String($(element).find('td:nth-of-type(7) span').text());
        this_season['타수'] = String($(element).find('td:nth-of-type(8) span').text());
        this_season['득점'] = String($(element).find('td:nth-of-type(9) span').text());
        this_season['안타'] = String($(element).find('td:nth-of-type(10) span').text());
        this_season['2루타'] = String($(element).find('td:nth-of-type(11) span').text());
        this_season['3루타'] = String($(element).find('td:nth-of-type(12) span').text());
        this_season['홈런'] = String($(element).find('td:nth-of-type(13) span').text());
        this_season['루타'] = String($(element).find('td:nth-of-type(14) span').text());
        this_season['타점'] = String($(element).find('td:nth-of-type(15) span').text());
        this_season['도루'] = String($(element).find('td:nth-of-type(16) span').text());
        this_season['도실'] = String($(element).find('td:nth-of-type(17) span').text());
        this_season['볼넷'] = String($(element).find('td:nth-of-type(18) span').text());
        this_season['사구'] = String($(element).find('td:nth-of-type(19) span').text());
        this_season['고4'] = String($(element).find('td:nth-of-type(20) span').text());
        this_season['삼진'] = String($(element).find('td:nth-of-type(21) span').text());
        this_season['병살'] = String($(element).find('td:nth-of-type(22) span').text());
        this_season['희타'] = String($(element).find('td:nth-of-type(23) span').text());
        this_season['희비'] = String($(element).find('td:nth-of-type(24) span').text());
        this_season['타율'] = String($(element).find('td:nth-of-type(25) span').text());
        this_season['출루율'] = String($(element).find('td:nth-of-type(26) span').text());
        this_season['장타율'] = String($(element).find('td:nth-of-type(27) span').text());
        this_season['OPS'] = String($(element).find('td:nth-of-type(28) span').text());
        this_season['WRC+'] = String($(element).find('td:nth-of-type(29) span').text());
        this_season['WAR*'] = String($(element).find('td:nth-of-type(30) span').text());
      });
    });
    res.json({
      이름 : req.params.name,
      this_season,
    });
  } catch (err) {
    console.error(err);
  }
};


const getTotalHitterData = async (req, res) => {
  const name = req.params.name;
  const URL = encodeURI(`http://www.statiz.co.kr/player.php?name=${name}`);
  try {
    await axios({
      url : URL,
      method : "GET",
      responseType : "arraybuffer",
    }).then(async (html) => {
      const content = iconv.decode(html.data, "UTF-8").toString();

      const $ = cheerio.load(content);

      $('table tbody .evenrow_stz0:nth-of-type(8)').map((i, element) => {
        total_season['년도'] = String($(element).find('td:nth-of-type(2) span').text());
        total_season['경기수'] = String($(element).find('td:nth-of-type(6) span').text());
        total_season['타석'] = String($(element).find('td:nth-of-type(7) span').text());
        total_season['타수'] = String($(element).find('td:nth-of-type(8) span').text());
        total_season['득점'] = String($(element).find('td:nth-of-type(9) span').text());
        total_season['안타'] = String($(element).find('td:nth-of-type(10) span').text());
        total_season['2루타'] = String($(element).find('td:nth-of-type(11) span').text());
        total_season['3루타'] = String($(element).find('td:nth-of-type(12) span').text());
        total_season['홈런'] = String($(element).find('td:nth-of-type(13) span').text());
        total_season['루타'] = String($(element).find('td:nth-of-type(14) span').text());
        total_season['타점'] = String($(element).find('td:nth-of-type(15) span').text());
        total_season['도루'] = String($(element).find('td:nth-of-type(16) span').text());
        total_season['도실'] = String($(element).find('td:nth-of-type(17) span').text());
        total_season['볼넷'] = String($(element).find('td:nth-of-type(18) span').text());
        total_season['사구'] = String($(element).find('td:nth-of-type(19) span').text());
        total_season['고4'] = String($(element).find('td:nth-of-type(20) span').text());
        total_season['삼진'] = String($(element).find('td:nth-of-type(21) span').text());
        total_season['병살'] = String($(element).find('td:nth-of-type(22) span').text());
        total_season['희타'] = String($(element).find('td:nth-of-type(23) span').text());
        total_season['희비'] = String($(element).find('td:nth-of-type(24) span').text());
        total_season['타율'] = String($(element).find('td:nth-of-type(25) span').text());
        total_season['출루율'] = String($(element).find('td:nth-of-type(26) span').text());
        total_season['장타율'] = String($(element).find('td:nth-of-type(27) span').text());
        total_season['OPS'] = String($(element).find('td:nth-of-type(28) span').text());
        total_season['WRC+'] = String($(element).find('td:nth-of-type(29) span').text());
        total_season['WAR*'] = String($(element).find('td:nth-of-type(30) span').text());
      });
    });
    res.json({
      이름 : req.params.name,
      total_season,
    });
  } catch (err) {
    console.error(err);
  }
}


module.exports = { getHitterData, getTotalHitterData };