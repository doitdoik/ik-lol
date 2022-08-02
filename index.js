let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 80;
let fs = require("fs");
let apiKey = "RGAPI-7b734d37-2db0-4bad-b41f-e1b133324fec";

app.use(express.static("lol_html"));

app.listen(port, function(){
    console.log("HTML 서버 시작");
});

app.get("/search", (req, res) => {
    console.log("111111");
    fs.readFile("lol_html/search.html", (error, data) => {
        console.log("2222222");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
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
        res.json(response.data)
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
        
        return response;
    }
    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data);
    });
});