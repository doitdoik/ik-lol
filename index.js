let express = require("express");
let app = express();
let port = process.env.PORT || 80;

app.use(express.static("lol_html"));

app.listen(port, function(){
    console.log("HTML 서버 시작");
});

