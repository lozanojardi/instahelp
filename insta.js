// Here You can type your custom JavaScript...
var listofaccounts = [];

var friends_per_comment = 1;
var prefix = "Berry Cobbler";
var prefixbool = false;
var agradament = false;

function comenca(){
  localStorage.iteracio = 0;
  continua();
}

function continua(){
  var llistaiteracio = "";
  var startiteracio = parseInt(localStorage.iteracio);
  for (var i = localStorage.iteracio; i < startiteracio+friends_per_comment; i++) {
    llistaiteracio += listofaccounts[i]+" ";
  }
  if (prefixbool){
    llistaiteracio = prefix + " " + llistaiteracio;
  }
  copyToClipboard(llistaiteracio);
  localStorage.iteracio = startiteracio+friends_per_comment;
  actualitzapanell(startiteracio,llistaiteracio);
}
crearpanell();
continua();

function copyToClipboard(text) {

  // Create a "hidden" input
  var aux = document.createElement("input");

  // Assign it the value of the specified element
  aux.setAttribute("value", text);

  // Append it to the body
  document.body.appendChild(aux);

  // Highlight its content
  aux.select();

  // Copy the highlighted text
  document.execCommand("copy");

  // Remove it from the body
  document.body.removeChild(aux);

}

function crearpanell(){
  
  var panell = "<style> .btn{margin: 5px; padding: 5px; background-color:blue;cursor: pointer;}</style><div style='position:absolute; left: 20%; top: 50px;' ><div onclick='comenca()' class='btn' id='comença'>Engega</div><div class='btn' onclick='continua()' id='continua'>Continua</div><div id='panell'></div><div id='infos'></div></div>";
  var aux = document.createElement("div");
  aux.id = "panellet";
  document.body.appendChild(aux);
  document.getElementById("panellet").innerHTML = panell;
  
}

function actualitzapanell(iteracio, comptes){
  var agradamentetiqueta = (agradament)? "Activat" : "Desactivat";
  var prefixetiqueta = (prefixbool) ? prefix : "Desactivat";
  if (iteracio >= listofaccounts.length) {
    document.getElementById("panell").innerHTML = "<p>Ended & Ready</p>";
  } else {
    document.getElementById("panell").innerHTML = "<p><b>Iteracio: </b>"+iteracio+"</p><p><b>Comptes: </b>"+comptes+"</p>";
  }
  document.getElementById("infos").innerHTML = "<p><b>Comptes/Comentari: </b>"+friends_per_comment+"</p><p><b>Auto-agradament: </b>"+agradamentetiqueta+"</p><p><b>Prefix: </b>"+prefixetiqueta+"</p>";
}

let lastKnownScrollPosition = 0;
let ticking = false;
var ultim = 0;
function doSomething(scrollPos) {
  if(agradament){
    var num = parseInt(scrollPos/800)
    if(num > ultim) {
      //console.log(num);
      //console.log($("[aria-label=\"Like\"][width=\"24\"]")[0]);
      if($("[aria-label=\"Like\"][width=\"24\"]")[0]){
        $("[aria-label=\"Like\"][width=\"24\"]")[0].parentElement.parentElement.click();
         ultim = num;
      }
    }
  }
  
  
}

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

