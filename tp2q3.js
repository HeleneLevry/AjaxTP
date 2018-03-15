"use strict";

let x = 0;
let y = 0;

let min=1;
let max = 8;

function addNewFlower(event){
	
	// Event on click
	event = window.event;
	// Find position
	x = event.clientX;
	y = event.clientY;
	

	// Ramdom number to choose picture
	let nbr = Math.floor(Math.random()*max-min+1)+min;
	console.log("flower number: " + nbr + "\n x: " + x + "\t y: " + y);

	// Create new picture
	let imgFlower = document.createElement("img");
	imgFlower.src = 'fleur'+nbr+'a.png';
	// Après chargement des propriétés
	imgFlower.onload = function(){
		// Ajout image dans la page
		document.getElementById('elementClick').appendChild(imgFlower);
		// Détermination position de la fleur
		imgFlower.style.position = 'absolute';
		imgFlower.style.left = x - imgFlower.clientWidth/2 + 'px';
		imgFlower.style.top = y - imgFlower.clientHeight + 'px';
		if (nbr!=4){
			// Draggable false
			imgFlower.draggable = false;
		}
		else{
			// Draggable = true
			imgFlower.draggable = true;
			imgFlower.style.zIndex = "1";
			// DragStart
			imgFlower.addEventListener('dragstart', function(e){
				// Change id to make it unique
				imgFlower.id = "imgToDrag";
			});
		}
	}
}

// Dragover
let dropper = document.getElementById('elementClick');
dropper.addEventListener('dragover', function(e){
	e.preventDefault();
});

// Drop
dropper.addEventListener('drop', function(e){
	e.preventDefault();
	// Find image to drop
	let imgToDrag = document.getElementById('imgToDrag');
	// Choose new position
	imgToDrag.style.position = 'absolute';
	imgToDrag.style.left = e.clientX - imgToDrag.clientWidth/2 + 'px';
	imgToDrag.style.top = e.clientY - imgToDrag.clientHeight + 'px';
	// Change id to allow new images to be drop
	imgToDrag.id = "";
});

// Call function
document.getElementById('elementClick').onclick = addNewFlower;


