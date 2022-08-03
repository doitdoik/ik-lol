let searchRes = new Object;

function searchSummonerId(){
    let summonerName = $('#summonerName').val();
	
	// console.log(summonerName);
    if(summonerName=="" || summonerName==null){
		alert("닉네임을 입력해주세요.");		
	}else{
		console.log("2222222222222222222");
		$.ajax({
			url : "/get_summoner_name",
			type : "GET",	 
            cache : false,
			dataType : "json",
			data: {
				"summonerName" : summonerName
				
			},
			success: function (res) {
				// console.log(res);
				searchRes.id = res.id;
				searchRes.accountId = res.accountId;
				searchRes.puuid = res.puuid;
				searchRes.name = res.name;
				searchRes.profileIconId = res.profileIconId;
				searchRes.revisionDate = res.revisionDate;
				searchRes.summonerLevel = res.summonerLevel;
				
				// console.log(searchRes);
				// return res;
				return searchSummonerInfo(searchRes.id);
			},error:function(e, textStatus){
				console.log("error");
				console.log(e);
				console.log(textStatus);
			}
		});	
	}    
}

function searchSummonerInfo(id){
	$('#search_res').empty();
	console.log("info");
	console.log(id);
	let obj = new Object;
	$.ajax({
		url : "/get_summoner_info",
		type : "GET",
		cache : false,
		dataType : "json",
		data : {
			"summonerId" : id
		},
		success : function(res) {
			// console.log(res);
			obj = document.getElementById("search_res");
			let newDiv = document.createElement("div");
			newDiv.innerHTML = "닉네임 - " + searchRes.name + "<br>"
								+"소환사레벨 - " + searchRes.summonerLevel + "<br>"
								+"전적 - " + res[0].wins + "승 / " + res[0].losses + "패" + "<br>"
								+"티어 - " + res[0].tier + " " + res[0].rank + " "  + "<br>"
								+"리그포인트 - " + res[0].leaguePoints + "<br>"
								+'<img src="/img/rank/Emblem_' + res[0].tier + '.png" style="width:150px; height:150px;"><br>'
								;
				
			obj.appendChild(newDiv);
			return res;
			// return newSearch(searchRes, res[0]);
		},error : function(e, textStatus){
			console.log(e);
		}
	})
}


function newSearch(){
	location.href = "/search/"
	// let summonerName = $('#summonerName').val();
	// $.ajax({
	// 	url : "/search/",
	// 	type : "GET",
	// 	cache : false,
	// 	//dataType : "json",
	// 	data : summonerName,
	// 	success : (res) => {
	// 		console.log(res);
	// 	},error : (e, textStatus) => {
	// 		console.log(e);
	// 	}
	// });
}