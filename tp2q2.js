// -------------------------
// 2. Créer un "survol" (hover ou rollover)

"use strict";

function openDoor(){
	player.pause();
	player.currentTime = 0;
	imgDoor.src = 'porte_ouverte.gif';
	player.play();
}
function closeDoor(){
	player.pause();
	player.currentTime = 0;
	imgDoor.src = 'porte.gif';
	player.play();
}
function goTo(){
	document.location.href="tp2q3.html";
}

var imgDoor = document.getElementById('imgDoor');
var player = document.getElementById('creacking');

imgDoor.onmouseover = openDoor;
imgDoor.onmouseout = closeDoor;
imgDoor.onclick = goTo;

