// document.addEventListener('DOMContentLoaded', function() {
// 	document.getElementById('myButton').onclick = 
(function(){
var xhr = new XMLHttpRequest();
var gameId = location.href.split('/')[4];
xhr.open("GET", "https://steamspy.com/api.php?request=appdetails&appid=" + gameId, true); // тут происходит ГЕТ запрос на указанную страницу
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) // если всё прошло хорошо, выполняем, что в скобках
  {
  	var timeBeautify = function(t){
  		var t1,t2;
  		return (
  			    (
  			    	((t1 = Math.floor(t/60))>=10)? t1 : (
  			    										t1 > 0? 0+""+t1 : '00' 
  			    									   )
  			    )
  			    +":"+
  			    (
  			    ((t2 = Math.floor(t%60))>=10)? t2 : (
  			    										t2 > 0? 0+""+t2 : '00' 
  			    									   )
  			    )
  			   )
  	};

	//alert(xhr.responseText);
	var el = document.querySelector(".apphub_AppName");
	console.log(el);
	var rightcol = document.querySelector(".rightcol.game_meta_data");
	var bodyDiv = document.createElement('div');
	var d = document.createElement('div');
	bodyDiv.appendChild(d);
	d.className = "steamspy block responsive_apppage_details_right";
	var data = JSON.parse(xhr.responseText);

	var logoP = document.createElement('p');
	d.appendChild(logoP);	

	var logoA = document.createElement('a');
	logoA.href = "https://steamspy.com/app/" + gameId;
	logoP.appendChild(logoA);	

	var logo = document.createElement('img');
	logo.src = chrome.extension.getURL( 'icons/logo_white.png' );
	logoA.appendChild(logo);	

	var owners = document.createElement('p');
	owners.className = "steamSpyOwners";
	owners.innerHTML = "<strong>Owners:</strong> " + data.owners.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') + " ± " +data.owners_variance.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
	d.appendChild(owners);

	var player2 = document.createElement('p');
	player2.className = "steamSpyPlayer2";
	player2.innerHTML = "<strong>Players (2 weeks):</strong> " + data.players_2weeks.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') + " ± " +data.players_2weeks_variance.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
	d.appendChild(player2);

	var players = document.createElement('p');
	players.className = "steamSpyPlayers";
	players.innerHTML = "<strong>Players total:</strong> " + data.players_forever.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') + " ± " +data.players_forever_variance.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
	d.appendChild(players);

	var peak = document.createElement('p');
	peak.className = "steamSpyPeak";
	peak.innerHTML = "<strong>Peak concurrent players yesterday:</strong> " + data.ccu.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
	d.appendChild(peak);

	var playtime2 = document.createElement('p');
	playtime2.className = "steamSpyPlaytime2";
	playtime2.innerHTML = "<strong>Playtime (2 weeks):</strong> " + timeBeautify(data.average_2weeks)+ " (AVG) " +timeBeautify(data.median_2weeks)+" (MDN)";
	d.appendChild(playtime2);

	var playtime = document.createElement('p');
	playtime.className = "steamSpyPlaytime";
	playtime.innerHTML = "<strong>Playtime total:</strong> " + timeBeautify(data.average_forever)+ " (AVG) " +timeBeautify(data.median_forever)+" (MDN)";
	d.appendChild(playtime);

	//d.innerHTML = data.name;
	rightcol.insertBefore(bodyDiv, rightcol.firstChild);

  }
}
xhr.send();
} )();
//}, false);