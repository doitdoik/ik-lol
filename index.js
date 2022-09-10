let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 80;
let fs = require("fs");
let apiKey = "RGAPI-47a99c03-eb2f-4d89-8e63-259b6c603e26";
let summonerInfo = new Object;

app.set("view engine", "ejs");
app.use(express.static("lol_html"));
app.engine("html", require("ejs").renderFile);
app.listen(port, function(){
    console.log("HTML 서버 시작");
});


app.post("/search", (req, res) => {
    let title = summonerInfo.name;
    let tier = summonerInfo.tier;

    res.render("search", {
        "name" : summonerInfo.name, 
        "tier" : summonerInfo.tier,
        "level" : summonerInfo.summonerLevel,
        "rank" : summonerInfo.rank,
        "wins" : summonerInfo.wins,
        "losses" : summonerInfo.losses,
        "leaguePoints" : summonerInfo.leaguePoints,
        "img" : "/img/rank/Emblem_"+summonerInfo.tier+".png"
    });
});



app.get("/search", (req, res) => {
    summonerInfo.name = req.query.name;
    summonerInfo.tier = req.query.tier;
    summonerInfo.id = req.query.id;
    summonerInfo.accountId = req.query.accountId;
    summonerInfo.puuid = req.query.puuid;
    summonerInfo.profileIconId = req.query.profileIconId;
    summonerInfo.revisionDate = req.query.revisionDate;
    summonerInfo.summonerLevel = req.query.summonerLevel;
    summonerInfo.wins = req.query.wins;				
    summonerInfo.losses = req.query.losses;
    summonerInfo.rank = req.query.rank;
    summonerInfo.leaguePoints = req.query.leaguePoints;
 
});

// 소환사 닉네임으로 id 찾기
app.get("/get_summoner_name", (req, res) => {
    let url = "";
    let uriName = encodeURI(req.query.summonerName);

    let api = async() => {
        let response = null;
        url += "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ uriName + "?api_key=" + apiKey;
        
        try {
            response = await axios.get(url);

        } catch (error) {
            console.log("error");
            console.log(error);
        }
        
        return response;
    }

    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        
        res.json(response.data);
    });
});

// 찾은 id로 티어 찾기
app.get("/get_summoner_info", (req, res) => {
    let url = "";
    let api = async() => {        
        let response = null;
        url += "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ req.query.summonerId + "?api_key=" + apiKey;
        
        try {
            response = await axios.get(url);

        } catch (error) {
            console.log("error");
            console.log(error);
        };
        // console.log(response);
        return response;
    }
    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data);
        
    });
});