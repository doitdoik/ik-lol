
async function searchSummoner(){
    let summonerName = $('#summonerName').val();
	let requestURL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summonerName + "?api_key=";
	// console.log(summonerName);
	
    if(summonerName=="" || summonerName==null){
		alert("닉네임을 입력해주세요.");		
	}else{
		
		console.log("1111111111111111111111")
		$.ajax({
			url : "/summoner_name",
			type : "GET",	 
            cache : false,
			dataType : "json",
			data: {
				"summonerName" : summonerName,
				"requestURL" : requestURL
			},
			success: function (res) {
				console.log("2222222222222222222");
				// searchRes.id = res.id;
				// searchRes.accountId = res.accountId;
				// searchRes.puuid = res.puuid;
				// searchRes.name = res.name;
				// searchRes.profileIconId = res.profileIconId;
				// searchRes.revisionDate = res.revisionDate;
				// searchRes.summonerLevel = res.summonerLevel;
				var test = JSON.parse(res.result);
				console.log(test);
				return res;
				 
			},error:function(e, textStatus){
				console.log("error");
				console.log(e);
				console.log(textStatus);
			}
		});	
	}    
}