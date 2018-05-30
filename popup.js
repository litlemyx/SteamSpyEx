(function(){
	var xhr = new XMLHttpRequest(),
		gameId = location.href.split('/')[4],
		steamspyUrl = "https://steamspy.com";

	xhr.open("GET", steamspyUrl + "/api.php?request=appdetails&appid=" + gameId, true); // тут происходит ГЕТ запрос на указанную страницу
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var timeBeautify = function(t) {
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

			var data = JSON.parse(xhr.responseText);

			// Setup where to add the data on page
			var el = document.querySelector(".apphub_AppName");
			console.log(el);

			if (!el && !!data) {
				console.log("// == SteamSpy Data For " + app.name + " == //");
				console.log(data);
				return;
			}

			// Create new dom elements
			var rightcol = document.querySelector(".rightcol.game_meta_data");
			var bodyDiv = document.createElement('div');
			var d = document.createElement('div');
			d.className = "steamspy block responsive_apppage_details_right";
			bodyDiv.appendChild(d);

			// Add SteamSpy logo
			var logoP = document.createElement('p');
			d.appendChild(logoP);

			var logoA = document.createElement('a');
			logoA.href = steamspyUrl + "/app/" + gameId;
			logoP.appendChild(logoA);

			var logo = document.createElement('img');
			logo.src = chrome.extension.getURL( 'icons/logo_white.png' );
			logoA.appendChild(logo);

			if (data.appid === 999999) {
				var hidden = document.createElement('p');
				hidden.innerHTML = "<strong>Developer has hidden the data</strong>";
				d.appendChild(hidden);
			} else {
				var owners = document.createElement('p');
				owners.className = "steamSpyOwners";
				owners.innerHTML = "<strong>Owners:</strong> " + data.owners;
				d.appendChild(owners);

				var peak = document.createElement('p');
				peak.className = "steamSpyPeak";
				peak.innerHTML = "<strong>Peak concurrent players yesterday:</strong> " + data.ccu.toString();
				d.appendChild(peak);

				var playtime2 = document.createElement('p');
				playtime2.className = "steamSpyPlaytime2";
				playtime2.innerHTML = "<strong>Playtime (2 weeks):</strong> " + timeBeautify(data.average_2weeks)+ " (AVG) " +timeBeautify(data.median_2weeks)+" (MDN)";
				d.appendChild(playtime2);

				var playtime = document.createElement('p');
				playtime.className = "steamSpyPlaytime";
				playtime.innerHTML = "<strong>Playtime total:</strong> " + timeBeautify(data.average_forever)+ " (AVG) " +timeBeautify(data.median_forever)+" (MDN)";
				d.appendChild(playtime);
			}

			rightcol.insertBefore(bodyDiv, rightcol.firstChild);
		}
	}
	xhr.send();
})();

