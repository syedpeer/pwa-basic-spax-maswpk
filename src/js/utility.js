
function resetAllSections(){
	document.querySelector("#home").style.display = "none";
  document.querySelector("#resources").style.display = "none";  
  document.querySelector("#faq").style.display = "none";
	document.querySelector("#speakers").style.display = "none";
	document.querySelector("#schedule").style.display = "none";
  document.querySelector("#contact").style.display = "none";
	document.querySelector("#code-of-conduct").style.display = "none";
	document.querySelector("#videos").style.display = "none";
	document.querySelector("#about").style.display = "none";
}

function hideShowSection(sectName){

  //console.log("" + sectName);

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

function goPageSection(pageName, sectName){
  window.location.href = pageName + sectName;
}



var n = 1

function abc(param)
{
  var step = 2;
  var innerHtml = '';
  if(n>0){
    if (step == '1') {
      innerHtml = `
          <div class="box" style="background-color:red" id="prodcolor">
           <span style="display:none"> Sample</span>
          </div>
      `;
    }
    return `
        <div>
        ${innerHtml}
        </div>
    `;

  }
}