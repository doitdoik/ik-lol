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
					searchRes.wins = res[i].wins;				
					searchRes.losses = res[i].losses;
					searchRes.tier = res[i].tier;
					searchRes.rank = res[i].rank;
					searchRes.leaguePoints = res[i].leaguePoints;
					searchRes.queueType = res[i].queueType;
				}
			}
			console.log(searchRes);

			return newSearch();
		},error : function(e, textStatus){
			console.log(e);
		}
	})
}



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
	$.ajax({
		url : "/search",
		type : "POST",
		cache : false,
		// dataType : "json",
		// data : totalData,
		success : (res) => {
			//location.href = "test2";
			$("#goSearch").click();
			console.log(res);
		},error : (e, textStatus) => {
			console.log(e);
		}
	});
}