const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

let team_ranking = [];

export const getTeamRankingData = async (req, res) => {
  const year = req.params.year;
  const URL = `https://sports.news.naver.com/kbaseball/record/index?category=kbo&year=${year}`;
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

        team_ranking.push({
          순위:rank,
          팀명:team,
          경기수:game,
          승:win,
          패:lose,
          무:draw,
          승차:gameBehind,
          연속:continuity,
          출루율:obp,
          장타율:slg,
          최근10경기:recentMatchs
        })
      })
      res.json(team_ranking)

      team_ranking = [];
    })
  } catch (err) {
    console.error(err);
  }
}