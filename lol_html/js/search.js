module.exports = {
    HTML:function(title, name, tmp){
      let res = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
      <script>
      $('#search_res').empty();
      obj = document.getElementById("search_res");
      let newDiv = document.createElement("div");
      newDiv.innerHTML = "닉네임 - " + ${tmp.name} + "<br>"
                          +"소환사레벨 - " + ${tmp.summonerLevel} + "<br>"
                          +"전적 - " + ${tmp.wins} + "승 / " + ${tmp.losses} + "패" + "<br>"
                          +"티어 - " + ${tmp.tier} + " " + ${tmp.rank} + " "  + "<br>"
                          +"리그포인트 - " + ${tmp.leaguePoints} + "<br>"
                          +'<img src="/img/rank/Emblem_' + ${tmp.tier} + '.png" style="width:150px; height:150px;"><br>'
                          ;
          
      obj.appendChild(newDiv);
      </script>
      <div id="search_res"></div>
      </body>
      </html>
      `;
      // console.log(res);
        // obj = document.getElementById("search_res");
        // let newDiv = document.createElement("div");
        // newDiv.innerHTML = "닉네임 - " + tmp.name + "<br>"
        //                     +"소환사레벨 - " + tmp.summonerLevel + "<br>"
        //                     +"전적 - " + tmp.wins + "승 / " + tmp.losses + "패" + "<br>"
        //                     +"티어 - " + tmp.tier + " " + tmp.rank + " "  + "<br>"
        //                     +"리그포인트 - " + tmp.leaguePoints + "<br>"
        //                     +'<img src="/img/rank/Emblem_' + tmp.tier + '.png" style="width:150px; height:150px;"><br>'
        //                     ;
            
        // obj.appendChild(newDiv);
        return res;
    }
  }