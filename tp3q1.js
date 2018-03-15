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
		// Create row
		var tr = document.createElement("tr");
		// Put infos in the cells
		tr.innerHTML += '<td class="centerCell">' + item.nom + '</td> <td class="centerCell">' + item.numero + '</td>';
		// Add row to the body table
		tbody.appendChild(tr);
	});
}

// ----- Programme -----
window.onload = init;