let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 80;
let fs = require("fs");
let apiKey = "RGAPI-571714ca-2f4b-4475-be84-351bd5f21f13";
let search = require('./lol_html/js/search.js');
app.use(express.static("lol_html"));

app.listen(port, function(){
    console.log("HTML 서버 시작");
});

app.get("/search", (req, res) => {
    console.log("111111");
    fs.readFile("lol_html/search.html", (error, data) => {
        
        console.log(data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

// app.get("/search/:summonerId", (req, res) => {
//     console.log("오는거야?");
//     console.log(res.status(202));
//     let summonerName = req.params.summonerId;
//     console.log(summonerName);

    
//     fs.readFile("lol_html/js/search.js", "utf8" ,(error, data) => {
//         console.log("2222222");
//         // console.log(res);
//         let title = summonerName + " 검색 결과";
//         let name = summonerName;
//         let tmp = req.query;
//         let html = search.HTML(title, name, tmp);
//         res.send(html);
//     });
// });

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
        
        return response;
    }
    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data);
        
    });
});