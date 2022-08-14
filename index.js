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

// app.get("/search", (req, res) => {
//     console.log("get 왔다");
//     console.log(req.query);

//     res.render("hello.ejs", {"data" : req.query.name}, (err, html) => {
//         if (err){
//             console.log(err);
//         }
//         res.redirect(html);
//     });
//     // fs.readFile("lol_html/search.html", (error, data) => {
        
//     //     console.log(data);
//     //     res.writeHead(200, {'Content-Type': 'text/html'});
//     //     res.end(data);
//     // });
// });

// app.get("/test", (req, res) => {
//     fs.readFile("lol_html/js/search.js", "utf8" ,(error, data) => {
//         console.log("2222222");
//         // console.log(res);
//         let title = "베란다고양이 검색 결과";
//         let name = "베란다고양이";
//         let tmp = req.query;
//         let html = search.HTML(title, name, tmp);
//         res.send(html);
//     });
// });

// app.get("/test2", (req, res) => {
//     console("여기지??");
//     res.render("hello");
// });

app.post("/search", (req, res) => {
    // console.log(req);
    let title = summonerInfo.name;
    let tier = summonerInfo.tier;

    // res.render("hello");
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

// app.post("/search/:summonerId", (req, res) => {
//     console.log("post 왔다");
//     // console.log(req);
// })

app.get("/search", (req, res) => {
    // console.log("오는거야?");
    // console.log(req);
    // console.log(res);
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
    // console.log(summonerName);
    //console.log(summonerName);
    // console.log(summonerTier);
 //   res.render("hello", {"name" : summonerInfo.name, "tier" : summonerInfo.tier});
    
    // fs.readFile("views/hello.ejs", "utf8" ,(error, data) => {
    //     console.log("2222222");
    //     // console.log(res);
    //     let title = summonerName + " 검색 결과";
    //     let name = summonerName;
    //     let info = {
    //         "title" : title,
    //         "name" : name
    //     };
    //     let html = search.HTML(title, name, info);
    //     res.send(html);
    // });
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