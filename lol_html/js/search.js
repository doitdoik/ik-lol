module.exports = {
    HTML:(title, name, tmp) => {
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
      <div id="search_res"></div>
      </body>
      </html>
      `;
    },drawDiv:(summonerInfo) => {
      console.log("testtesttest");
      console.log(summonerInfo);
      $('#search_res').empty();
      obj = document.getElementById("search_res");
      let newDiv = document.createElement("div");
      newDiv.innerHTML = "닉네임 - " + summonerInfo.name + "<br>"
                          +"소환사레벨 - " + summonerInfo.summonerLevel + "<br>"
                          // +"전적 - " + ${tmp.wins} + "승 / " + ${tmp.losses} + "패" + "<br>"
                          // +"티어 - " + ${tmp.tier} + " " + ${tmp.rank} + " "  + "<br>"
                          // +"리그포인트 - " + ${tmp.leaguePoints} + "<br>"
                          // +'<img src="/img/rank/Emblem_' + ${tmp.tier} + '.png" style="width:150px; height:150px;"><br>'
                          ;
          
      obj.appendChild(newDiv);
    }
  }