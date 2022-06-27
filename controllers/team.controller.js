const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

const team_ranking = {
  "순위":"",
  "팀명":"",
  "경기수":"",
  "승":"",
  "패":"",
  "무":"",
  "연속":"",
  "출루율":"",
  "장타율":"",
  "최근10경기":"",
};

const getTeamRankingData = async (req, res) => {
  const URL = "https://sports.news.naver.com/kbaseball/record/index?category=kbo";
  try {
    await axios({
      url : URL,
      method : "GET",
      responseType : "arraybuffer",
    }).then(async (html) => {
      const content = iconv.decode(html.data, "UTF-8").toString();

      const $ = cheerio.load(content);

      const list = $("#regularTeamRecordList_table tr");

      await list.each(async (i, tag) => {
        let rank = $(tag).find("th strong").text()
        let team = $(tag).find("td:nth-of-type(1) span").text()
        let game = $(tag).find("td:nth-of-type(2) span").text()
        let win = $(tag).find("td:nth-of-type(3) span").text()
        let lose = $(tag).find("td:nth-of-type(4) span").text()
        let draw = $(tag).find("td:nth-of-type(5) span").text()
        let gameBehind = $(tag).find("td:nth-of-type(7) span").text()
        let continuity = $(tag).find("td:nth-of-type(8) span").text()
        let obp = $(tag).find("td:nth-of-type(9) span").text()
        let slg = $(tag).find("td:nth-of-type(10) span").text()
        let recentMatchs = $(tag).find("td:nth-of-type(11) span").text()


        console.log({
          rank,
          team,
          game,
          win,
          lose,
          draw,
          gameBehind,
          continuity,
          obp,
          slg,
          recentMatchs
        });
      })
    })
    res.json({
      team_ranking
    })
  } catch (err) {
    console.error(err);
  }
}


module.exports = { getTeamRankingData }