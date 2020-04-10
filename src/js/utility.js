
function resetAllSections(){
	document.querySelector("#home").style.display = "none";
	document.querySelector("#speakers").style.display = "none";
	document.querySelector("#schedule").style.display = "none";
	document.querySelector("#code-of-conduct").style.display = "none";
	document.querySelector("#videos").style.display = "none";
	document.querySelector("#about").style.display = "none";
}

function hideShowSection(sectName){
  var elem = document.querySelector(sectName);
  if (elem.style.display === "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

function dspPageSection(sectName){
  resetAllSections();
  document.querySelector(sectName).style.display = "block";
}

function jmpPageSection(sectName){
  document.querySelector(sectName).style.display = "block";
}

function removeElement() {
  document.getElementById("imgbox1").style.display = "none";
}