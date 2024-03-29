window.addEventListener("load", carregar);

function carregar(){
	ver_portfolio.addEventListener("click", mostrar_seccoes);
	document.getElementById("link_sobre").addEventListener("click", mostrar_seccoes);
	document.getElementById("link_projetos").addEventListener("click", mostrar_seccoes);
	document.getElementById("link_habilidades").addEventListener("click", mostrar_seccoes);
	document.getElementById("link_contato").addEventListener("click", mostrar_seccoes);

	trocar_slide();
}

let ver_portfolio = document.getElementById("btn_portfolio");

function mostrar_seccoes(){
         document.getElementById("seccoes").style.display="flex";
}

/*Slide*/
let avancar = document.getElementById("avancar");
let recuar = document.getElementById("recuar");
let slide = document.getElementById("lista-slide");
let item = 0;

function trocar_slide(){
	let valor = -100;
    
    avancar.addEventListener("click", function (e){
    	if( item < 3){
    		item++;
    		let total = item * valor;
    		slide.style.left=total+"%";
    	}
    	else if(item >= 3){
    		avancar.style.display="none";
    		recuar.style.display="unset";
    	}
    })

    recuar.addEventListener("click", function (e){
    	if (item > 0) {
    		item--;
    	    let total = item*valor;
    	    slide.style.left=total+"%";
    	}
    	else if(item < 1){
    		recuar.style.display="none";
    		avancar.style.display="unset";
    	}
    })
}
