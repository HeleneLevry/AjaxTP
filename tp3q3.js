"use strict"; 


// ----- Fonctions -----

// init
function init(){
	// Creat request
	var requestHeader = new XMLHttpRequest();
	requestHeader.open('GET', 'http://192.168.2.5/ajax/telephone.php?entete', true);
	// onload
	requestHeader.onload = function(){
		// if success
		if (requestHeader.status == 200){
			getHeaders(requestHeader);
			// Creat request
			var requestContent = new XMLHttpRequest();
			requestContent.open('GET', 'http://192.168.2.5/ajax/telephone.php?repertoire', true);
			// onload
			requestContent.onload = function(){
				// if success
				if (requestContent.status == 200){
					getContent(requestContent);
				}
				// Failed request
				else {
					console.log("Erreur http content: ", requestContent.status);
				}
			};
			// Send request
			requestContent.send(null);
		}
		// Failed request
		else {
			console.log("Erreur http header: ", requestHeader.status);
		}
	};
	// Send request
	requestHeader.send(null);
}

// getHeaders
function getHeaders(requestHeader){
	// print request
	console.log("Request headers : " + requestHeader.responseText);
	// Parse the JSON response
	let headers = JSON.parse(requestHeader.responseText);
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
	// print request
	console.log("Request content : " + requestContent.responseText);
	// Parse the JSON response
	let directory = JSON.parse(requestContent.responseText);
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
	directory.forEach(function(item){
		// Create button with properties
		var button = document.createElement("input");
		button.classList = "button"; button.type = "button"; button.value = "Suppr";
		// on click on the button
		button.onclick = function(){
			// Creat request
			var supprToDir = new XMLHttpRequest();
			// Open request PUT
			supprToDir.open('DELETE', 'http://192.168.2.5/ajax/telephone.php?repertoire', true);
			// onload
			supprToDir.onload = function(){
				// if success
				if (supprToDir.status == 204){
					// print request
					console.log("Request delete entry : " + supprToDir.responseText + '{"nom":"'+item.nom+'"}');
					// Refresh
					init();
				}
				// Failed request
				else {
					console.log("Erreur http add: " + supprToDir.status);
				}
			};
		// Send request
		supprToDir.send('{"nom":"'+item.nom+'"}');
		};
		// Create row
		var tr = document.createElement("tr");
		// Put infos in the cells
		tr.innerHTML += '<td class="centerCell">' + item.nom + '</td> <td class="centerCell">' + item.numero + '</td>';
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
	var AddButton = document.getElementById('champAdd');
	var SendButton = document.getElementById('champSend');
	AddButton.style="display:none;";
	SendButton.style="display:flex;";
}

// SendEntry
function SendEntry(){
	console.log("Send the new entry");
	addEntryToRep();
	var AddButton = document.getElementById('champAdd');
	var SendButton = document.getElementById('champSend');
	SendButton.style="display:none;";
	AddButton.style="display:flex;";
}

function addEntryToRep(){
	// Catch fields
	var nom = document.getElementById('nom');
	var numero = document.getElementById('numero');
	// Creat request
	var addToDir = new XMLHttpRequest();
	// Open request PUT
	addToDir.open('PUT', 'http://192.168.2.5/ajax/telephone.php?repertoire', true);
	// onload
	addToDir.onload = function(){
		// if success
		if (addToDir.status == 201){
			// print request
			console.log("Request add an entry: " + addToDir.responseText +'{"nom":"'+nom.value+'","numero":"'+numero.value+'"}');
			// Refresh the page
			init();
		}
		// Failed request
		else {
			console.log("Erreur http add an entry: " + addToDir.status);
		}
	};
	// Send request
	addToDir.send('{"nom":"'+nom.value+'","numero":"'+numero.value+'"}');
}

// ----- Programme -----
window.onload = init;
