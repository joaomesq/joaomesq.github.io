 let ver_portfolio = document.getElementById("btn_portfolio");

function mostrar_seccoes(){
         document.getElementById("seccoes").style.display="unset";
         document.getElementById("seccoes").style.animationDelay=".4s";
}

function carregar(){
	ver_portfolio.addEventListener("click", mostrar_seccoes);
	document.getElementById("link_sobre").addEventListener("click", mostrar_seccoes);
	document.getElementById("link_habilidades").addEventListener("click", mostrar_seccoes);
	document.getElementById("link_contato").addEventListener("click", mostrar_seccoes);
}

window.addEventListener("load", carregar);