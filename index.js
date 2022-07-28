let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 80;
let apiKey = "RGAPI-adf3e9b1-b500-4178-9e89-00849db5ac4f";

app.use(express.static("lol_html"));

app.listen(port, function(){
    console.log("HTML 서버 시작");
});

app.get("/summoner_name", (req, res) => {
    let url = "";
    let uriName = encodeURI(req.query.summonerName);
    // console.log(res);
     console.log("3333333333333333");
    // console.log(req);
    // console.log("4444444444444444");
    let api = async() => {
        let response = null;
        console.log("url??????????????????");
        url += "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ uriName + "?api_key=" + apiKey;
        console.log(req.query.summonerName);

        try {
            response = await axios.get(url);

        } catch (error) {
            console.log("error");
            console.log(error);
        }
        console.log(response);
        return response;
    }

    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data)
    });
})