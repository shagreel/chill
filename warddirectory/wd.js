    (function(){
    window.data = [];
	async function load(){
		
        let unit = window.location.href.split('/')[3];
		let members = await fetchData(unit); 

		members.forEach(member => {			
				
			// if (member.displayName === 'Jake Stutz') {
			// 	household.address = '9 Heritage Halls #3104';
			// }
			

			let formattedData = {
				addressKey: getAddressKey(member.address || ''),
				address: (member.address || '').split('Provo')[0].replace('Rm ', '#'),
				name: member.members[0].displayName,
				phone: member.phone,
				email: member.email,
				id: member.members[0].uuid,
				householdId: member.members[0].householdUuid,
				houseImage: `https://directory.churchofjesuschrist.org/api/v4/photos/households/${member.members[0].householdUuid}`,
				image: `https://directory.churchofjesuschrist.org/api/v4/photos/members/${member.members[0].uuid}`,
			};

			if (["e3347f50-5614-43ce-9f16-c7b1ca37a83d", "d1cfed5f-33ea-4669-af38-37651488bcc4", "42cc63f5-030f-4903-88ff-b651f487f327", "d56b24dd-36e2-4c0d-b8fe-955a609e4e2a", "d17faeeb-0e75-4658-9a31-34a73df2a136", "e3defaa2-80ad-4983-98be-78079e692640"].includes(formattedData.id)) {
				return;
			}

			window.data.push(formattedData);
		});
		
		window.data = groupBy(window.data, 'addressKey');
		window.data = Object.values(window.data);

		var iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		let html = `    
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<title>Ward Directory</title>
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap" rel="stylesheet">
		<style>
			html, body {margin:0; padding:0; font-family:'Open Sans', sans-serif; font-size:12px;} 
			body { background:white; }
			.apartment{margin:20px}
			.apartment-title{font-weight: 100;font-size: 21px;border-bottom: solid 1px #cecece;	color: #5d5d5d;}
			.apartment-people {display:flex;}
			.apartment-people > div {flex:1; margin:5px; max-width:250px;}
			.profile-picture{ height:150px;}
			a {color:#2196f3; text-decoration:none;}
			@media print{
				.hide-for-print{ display:none;}
			}
		</style>
	</head>
	<body>
		<button class='hide-for-print' onclick='window.print();'>Print</button>	
		<div id='content'>
			<div style="text-align:center;">
			<svg width="50%" height="50%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="16" stroke-width="2" stroke="#93dbe9" stroke-dasharray="25.132741228718345 25.132741228718345" transform="rotate(275.6 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
			</div>
		</div>
	</body> 
	`;
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(html);
		iframe.contentWindow.document.close();	
		iframe.style.position = 'absolute'
		iframe.style.top = '0'
		iframe.style.zIndex = 9999
		iframe.style.width = '100%'
		iframe.style.border = 'none'
		iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';
		window.myIframe = iframe;
		render();
	}

	async function fetchData(unit){
		return await fetch(`https://directory.churchofjesuschrist.org/api/v4/households?unit=${unit}`, {
			"headers": {
				"accept-language": "en",
				"authorization": `Bearer ${document.cookie.split('directory_identity_token=')[1].split(';')[0]}`,
			},
			"method": "GET",

			}).then(r => r.json());
	}

	function getAddressKey(str){
		return str.split('Utah')[0].replace(/\D/g,'');
	}

	function groupBy(xs, key) {
		return xs.reduce(function(rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	};

	function render() {
			let output = window.data.map((apartment,i) => `
			<div class="apartment" style="page-break-after: ${(i+1)%5 === 0 ? 'always' : 'no'};">
				<div class="apartment-title">${apartment[0].address.replace(/(\r\n|\n|\r)/gm,"").replace("<br/>", ' ')}</div>
				<div class="apartment-people">
					${apartment.map(person => `
					<div>
						<div class="profile-picture" style="background:url(${person.image}) center center; background-size: cover, cover;"></div>
						<div style="padding:0 5px">
						<div>${person.name}</div>
						<div>${person.phone}</div>
						<div>${person.email}</div>
						</div>
					</div>
					`).join('')}
				</div>
			</div>
			`).join('');
		
		myIframe.contentDocument.getElementById('content').innerHTML = output;
		myIframe.style.height = myIframe.contentDocument.body.scrollHeight + 'px';
    }
    
    load();
})()
