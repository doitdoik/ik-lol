let express = require("express");
let app = express();
let port = process.env.PORT || 80;
let apiKey = "RGAPI-6087e0e6-293f-4243-87b9-526d83d648eb";
let url = ""
app.use(express.static("lol_html"));

app.listen(port, function(){
    console.log("HTML 서버 시작");
});

app.get("/summoner_name", (req, res) => {
    console.log(res);
    console.log("3333333333333333");
    //console.log(req);
    let api = async() => {
        let response = null;
        try {
            console.log(url);
            url += "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summonerName + "?api_key=" + apiKey;
            response = await axios.get(url, {
                params : {
                  
                }
            })
            // URL url = new URL(urlstr);
			// HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
			// urlconnection.setRequestMethod("GET");
			// // 여기에 문자열을 받아와라.
			// BufferedReader br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(),"UTF-8")); 
			
			
			// /// 2022-02-08 
			// RestTemplate restTemplate = new RestTemplate();
			// String res = restTemplate.getForObject(urlstr, String.class, "102", "1204");
			
			// logger.info("test@@@@@@@@@@@@@@@@@@@@@@@@");
			// logger.info(res);
			
			
			// String result = "";
			// String line;
			// // 그 받아온 문자열을 계속 br에서 줄단위로 받고 출력하겠다.
			// while((line = br.readLine()) != null) { 
			// 	result += line;
			// }
			// br.close(); // 출력 후 닫기

            console.log(req);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        //res.json(response.data.response.body)
    });
})