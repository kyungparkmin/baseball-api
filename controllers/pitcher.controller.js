const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

p_this_season = {
  '연도':'',
  '출장':'',
  '완투':'',
  '완봉':'',
  '선발':'',
  '승':'',
  '패':'',
  '세이브':'',
  '홀드':'',
  '이닝':'',
  '실점':'',
  '자책':'',
  '타자':'',
  '피안타':'',
  '피2타':'',
  '피3타':'',
  '피홈런':'',
  '볼넷':'',
  '사구':'',
  '삼진':'',
  '보크':'',
  '폭투':'',
  'ERA':'',
  'FIP':'',
  'WHIP':'',
  "ERA+":'',
  'FIP+':'',
  'WAR':'',
}

const getPitcherData = async (req, res) => {
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
        p_this_season['연도'] = String($(element).find('td:nth-of-type(2) span').text());
        p_this_season['출장'] = String($(element).find('td:nth-of-type(5) span').text());
        p_this_season['완투'] = String($(element).find('td:nth-of-type(6) span').text());
        p_this_season['완봉'] = String($(element).find('td:nth-of-type(7) span').text());
        p_this_season['선발'] = String($(element).find('td:nth-of-type(8) span').text());
        p_this_season['승'] = String($(element).find('td:nth-of-type(9) span').text());
        p_this_season['패'] = String($(element).find('td:nth-of-type(10) span').text());
        p_this_season['세이브'] = String($(element).find('td:nth-of-type(11) span').text());
        p_this_season['홀드'] = String($(element).find('td:nth-of-type(12) span').text());
        p_this_season['이닝'] = String($(element).find('td:nth-of-type(13) span').text());
        p_this_season['실점'] = String($(element).find('td:nth-of-type(14) span').text());
        p_this_season['자책'] = String($(element).find('td:nth-of-type(15) span').text());
        p_this_season['타자'] = String($(element).find('td:nth-of-type(16) span').text());
        p_this_season['피안타'] = String($(element).find('td:nth-of-type(17) span').text());
        p_this_season['피2타'] = String($(element).find('td:nth-of-type(18) span').text());
        p_this_season['피3타'] = String($(element).find('td:nth-of-type(19) span').text());
        p_this_season['피홈런'] = String($(element).find('td:nth-of-type(20) span').text());
        p_this_season['볼넷'] = String($(element).find('td:nth-of-type(21) span').text());
        p_this_season['사구'] = String($(element).find('td:nth-of-type(22) span').text());
        p_this_season['삼진'] = String($(element).find('td:nth-of-type(24) span').text());
        p_this_season['보크'] = String($(element).find('td:nth-of-type(25) span').text());
        p_this_season['폭투'] = String($(element).find('td:nth-of-type(26) span').text());
        p_this_season['ERA'] = String($(element).find('td:nth-of-type(27) span').text());
        p_this_season['FIP'] = String($(element).find('td:nth-of-type(28) span').text());
        p_this_season['WHIP'] = String($(element).find('td:nth-of-type(29) span').text());
        p_this_season['ERA+'] = String($(element).find('td:nth-of-type(30) span').text());
        p_this_season['FIP+'] = String($(element).find('td:nth-of-type(31) span').text());
        p_this_season['WAR'] = String($(element).find('td:nth-of-type(32) span').text());
      })
    })
    res.json({
      '이름' : req.params.name,
      p_this_season
    })
  } catch (err) {
    console.error(err);
  }


}

module.exports = { getPitcherData }