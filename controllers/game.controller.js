const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

let matchs = [];

const getTodayMatchsData = async (req, res) => {
  const URL = `https://sports.news.naver.com/kbaseball/index`;
  try {
    await axios({
      url : URL,
      method : "GET",
      responseType : "arraybuffer",
    }).then(async (html) => {
      const content = iconv.decode(html.data, "UTF-8").toString();

      const $ = cheerio.load(content);

      const list = $("#_tab_box_kbo .hmb_list ul .hmb_list_items  ");

      await list.each(async (i, tag) => {
        let awayTeam = $(tag).find(".vs_list:nth-of-type(1) .inner .name").text()
        let awayTeamPitcher  = $(tag).find(".vs_list:nth-of-type(1) .inner span:nth-of-type(3)").text()
        let awayTeamScore = $(tag).find(".vs_list:nth-of-type(1) .inner div").text().trim()
        let inning = $(tag).find(".state .inner em").text()
        let homeTeam = $(tag).find(".vs_list:nth-of-type(2) .inner .name").text()
        let homeTeamPitcher = $(tag).find(".vs_list:nth-of-type(2) .inner span:nth-of-type(3)").text()
        let homeTeamScore = $(tag).find(".vs_list:nth-of-type(2) .inner div").text().trim()


        matchs.push({
          원정팀:awayTeam,
          원정투수:awayTeamPitcher,
          원정팀점수:awayTeamScore,
          회:inning,
          홈팀:homeTeam,
          홈팀투수:homeTeamPitcher,
          홈팀점수:homeTeamScore,
        });
      })
      res.json(matchs)

      matchs = [];

    })
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getTodayMatchsData };