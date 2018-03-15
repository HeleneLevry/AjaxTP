// -------------------------
// 1. Construire un tableau à partir de saisies utilisateur

"use strict";

var tableHTML = document.getElementById("t1");
class Entry{
	constructor(name, phone){
		this.name = name;
		this.phone = phone;
	}
	/*display(tableHTML){
		var newRow = tableHTML.insertRow(-1);
		var newCellName = newRow.insertCell(0);
		newCellName.innerHTML += this.name;
		var newCellPhone = newRow.insertCell(1);
		newCellPhone.innerHTML += this.phone;
	}*/
	// OU
	display(tableHTML){
		var tr = document.createElement("tr");
		tr.innerHTML = '<td>' + this.name + '</td> <td class="centerCell">' + this.phone + '</td>';
		tableHTML.appendChild(tr);
	}
}
function saisie(){
	var name, phone, tabEntry=[];
	while ( (name = prompt("Enter a name")) && (phone = prompt("Enter a phone")) ){
		tabEntry.push(new Entry(name, phone));
	};
	return tabEntry;
}
function affiche(tabEntry){
	var tabEntrySort = tabEntry.sort(function(a,b){
		return a.name>b.name?1:-1;
	});
	for (var entry of tabEntrySort){
		entry.display(tableHTML);
	}
}
affiche(saisie());
