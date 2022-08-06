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
			for(let i = 0; i<res.length; i++){
				console.log(res[i].queueType);
				if(res[i].queueType == 'RANKED_SOLO_5x5'){
					searchRes.wins = res[0].wins;				
					searchRes.losses = res[0].losses;
					searchRes.tier = res[0].tier;
					searchRes.rank = res[0].rank;
					searchRes.leaguePoints = res[0].leaguePoints;
				}
			}
			// console.log(res[0]);
			// console.log("뭔데");
			// obj = document.getElementById("search_res");
			// let newDiv = document.createElement("div");
			// newDiv.innerHTML = "닉네임 - " + searchRes.name + "<br>"
			// 					+"소환사레벨 - " + searchRes.summonerLevel + "<br>"
			// 					+"전적 - " + res[0].wins + "승 / " + res[0].losses + "패" + "<br>"
			// 					+"티어 - " + res[0].tier + " " + res[0].rank + " "  + "<br>"
			// 					+"리그포인트 - " + res[0].leaguePoints + "<br>"
			// 					+'<img src="/img/rank/Emblem_' + res[0].tier + '.png" style="width:150px; height:150px;"><br>'
			// 					;
			// obj.appendChild(newDiv);

			// console.log("============================================================");
			// console.log(searchRes);
			// location.href = "/search/"+ searchRes.name;
			// return res;
			return newSearch();
		},error : function(e, textStatus){
			console.log(e);
		}
	})
}

// function newSearch(){
// 	//let summonerName = totalData.name;

// 	$.ajax({
// 		url : "/search/",
// 		type : "GET",
// 		cache : false,
// 		//dataType : "json",
// 		data : {"name" : "베란다고양이"},
// 		success : (res) => {
// 			//location.href = "/search/";
// 			console.log("123123123123123");
// 			console.log(res);
// 		},error : (e, textStatus) => {
// 			console.log("987987987987");
// 			console.log(e);
// 		}
// 	});
// }


function newSearch(){
	let totalData = searchRes;
	let summonerName = totalData.name;
	console.log("최종단");
	$.ajax({
		url : "/search",
		type : "GET",
		cache : false,
		// dataType : "json",
		data : totalData,
		success : (res) => {
			// location.href = "search";
			// console.log("123123123123123");
			console.log(res);
		},error : (e, textStatus) => {
			console.log("987987987987");
			console.log(e);
		}
	});
	movePage();
}

function movePage(){
	console.log("들어와야지");
	$.ajax({
		url : "/search",
		type : "POST",
		cache : false,
		// dataType : "json",
		// data : totalData,
		success : (res) => {
			//location.href = "test2";
			$("#goSearch").click();
			console.log("123123123123123");
			console.log(res);
		},error : (e, textStatus) => {
			console.log("987987987987");
			console.log(e);
		}
	});
}