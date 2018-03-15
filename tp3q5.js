"use strict"; 


// ----- Fonctions -----

// init
function init(){
	// Request to find headers
	makeAjaxCall('GET', 'http://192.168.2.5/ajax/telephone.php?entete', 200, null, 'fail to get headers')
	.then(getHeaders)
	.then(function(){
		// Request to find content
		return makeAjaxCall('GET', 'http://192.168.2.5/ajax/telephone.php?repertoire', 200, null, 'fail to get content')
	})
	.then(getContent)
	.catch(xhrReject);	
}

// makeAjaxCall
function makeAjaxCall(methodType, url, statusResolve, objectToSend, messageFail){
	// Promise object
	var promiseObject = new Promise(function(resolve, reject){
		// Create request
		var xhr = new XMLHttpRequest();
		xhr.open(methodType, url, true);
		// Send request
		xhr.send(objectToSend);
		// Onload function
		xhr.onload = function(){
			if (xhr.status === statusResolve){
				console.log("xhr done successfully");
				// Pass xhr to the resolve function
				resolve(xhr);
			}
			else{
				console.log("xhr failed");
				// Pass messageFail to the reject function
				reject(messageFail);
			}
		};
	});
	// Return the object promise
	return promiseObject;	
}

// xhrReject
function xhrReject(messageFail){
	console.log("failed :\n" + messageFail);
}

// getHeaders
function getHeaders(requestHeader){
	// Parse the JSON response
	let headers = JSON.parse(requestHeader.responseText);
	// print request
	console.log("Request headers : \n" + headers);
	// Find the table to fill
	let tableHTML = document.getElementById("t1");
	// Create header
	var thead = document.createElement("thead");
	// Remove elements of the table if exist
	while(tableHTML.firstChild){
		tableHTML.removeChild(tableHTML.firstChild);
	}
	// Add header to the table
	tableHTML.appendChild(thead);
	// Create row
	var tr = document.createElement("tr");
	// For each header, add it to the first row
	headers.forEach(function(item){
		tr.innerHTML += '<th class="centerCell">' + item + '</th>';
		thead.appendChild(tr);
	});
}

// getContent
function getContent(requestContent){
	// Parse the JSON response
	let content = JSON.parse(requestContent.responseText);
	// print request
	console.log("Request content : " + requestContent.responseText);
	// Find the table to fill
	let tableHTML = document.getElementById("t1");
	// Create body
	var tbody = document.createElement("tbody");
	// Remove elements of the body if exist
	while(tbody.firstChild){
		tbody.removeChild(tbody.firstChild);
	}
	// Add the body to the table
	tableHTML.appendChild(tbody);
	// For each header, add it to the first row
	content.forEach(function(item){
		// Create button with properties
		var button = document.createElement("input");
		button.classList = "button"; button.type = "button"; button.value = "Suppr";
		// on click on the button
		button.onclick = function(){
			makeAjaxCall('DELETE', 'http://192.168.2.5/ajax/telephone.php?repertoire', 204, '{"nom":"'+item.nom+'"}', 'fail to delete'+item.nom)
			.then(function(){
				console.log('Request delete entry :{"nom":"'+item.nom+'"}');
				init();
			}
			).catch(xhrReject);
		};
		// Create row
		var tr = document.createElement("tr");
		// Put infos in the cells
		tr.innerHTML += '<td>' + item.nom + '</td> <td class="centerCell">' + item.numero + '</td>';
		// Create last cell on the row
		var td = document.createElement("td");
		td.classList = "centerCell";
		// Put button in it
		td.appendChild(button);
		// Add cell to the row
		tr.appendChild(td);
		// Add row to the body table
		tbody.appendChild(tr);
	});
}

// AddEntry
function AddEntry(){
	console.log("Allow to add a new entry");
	// Change visibility
	var AddButton = document.getElementById('champAdd');
	var SendButton = document.getElementById('champSend');
	AddButton.style="display:none;";
	SendButton.style="display:flex;";
}

// SendEntry
function SendEntry(){
	console.log("Send the new entry");
	// Add a new entry to the content
	addEntryToRep();
	// Change visibility
	var AddButton = document.getElementById('champAdd');
	var SendButton = document.getElementById('champSend');
	SendButton.style="display:none;";
	AddButton.style="display:flex;";
}

// addEntryToRep
function addEntryToRep(){
	// Catch fields
	var nom = document.getElementById('nom');
	var numero = document.getElementById('numero');
	// Ajax request to add an new entry
	makeAjaxCall('PUT', 'http://192.168.2.5/ajax/telephone.php?repertoire', 201, '{"nom":"'+nom.value+'","numero":"'+numero.value+'"}')
		.then(function(){
			console.log('Request add an entry: {"nom":"'+nom.value+'","numero":"'+numero.value+'"}');
			init();
		}
	).catch(xhrReject);
}

// ----- Programme -----
window.onload = init;
setInterval(init, 20000);
