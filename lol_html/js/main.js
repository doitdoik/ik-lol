let searchRes = new Object;

async function searchSummoner(){
    let summonerName = $('#summonerName').val();
	// console.log(summonerName);
    if(summonerName=="" || summonerName==null){
		alert("닉네임을 입력해주세요.");		
	}else{
		console.log("2222222222222222222");
		$.ajax({
			url : "/summoner_name",
			type : "GET",	 
            cache : false,
			dataType : "json",
			data: {
				"summonerName" : summonerName
				
			},
			success: function (res) {
				console.log(res);
				console.log("success@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
				searchRes.id = res.id;
				searchRes.accountId = res.accountId;
				searchRes.puuid = res.puuid;
				searchRes.name = res.name;
				searchRes.profileIconId = res.profileIconId;
				searchRes.revisionDate = res.revisionDate;
				searchRes.summonerLevel = res.summonerLevel;
				var test = res.id;
				//console.log(searchRes);
				return res;
				 
			},error:function(e, textStatus){
				console.log("error");
				console.log(e);
				console.log(textStatus);
			}
		});	
	}    
}

function objTest(){
	console.log(searchRes);
}