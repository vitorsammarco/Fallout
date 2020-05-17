class Atributos {
    constructor(){
        this.listaNomes = [];
        this.listaPontos = [];
        this.pontosTotais = 16;
        this.foto=document.querySelector("#foto");
        this.nome;
        this.textoslongos=[
        'Força é uma medida do seu poder físico bruto. Afeta o quanto você pode carregar e os danos de todos os ataques corpo a corpo.',
        'Percepção é a sua consciência ambiental e o "sexto sentido". Afeta a precisão da arma no V.A.T.S.',
        'Resistência é uma medida do seu condicionamento físico geral. Afeta sua saúde total e o dreno do ponto de ação do Sprinting.',
        'Carisma é sua capacidade de encantar e convencer os outros. Isso afeta seu sucesso de persuadir o diálogo e os preços quando você troca.',
        'A inteligência é uma medida da sua acuidade mental geral. Isso afeta o número de pontos de experiência ganhos.',
        'Agilidade é uma medida de sua fineza e reflexos gerais. Afeta o número de pontos de ação no V.A.T.S. e sua capacidade de esgueirar-se.',
        'A sorte é uma medida da sua boa sorte geral. Isso afeta a taxa de recarga de ataques críticos e suas chances de encontrar itens melhores.'
        ]
    }

    trocarfoto(){
        for(let i=0; i<this.listaNomes.length; i++){
        document.querySelector("#linha"+[i]).addEventListener("mouseenter",a=>{
        this.foto.src = ("img/"+[i]+".png");
        document.getElementById("attrdesc").innerHTML= this.textoslongos[i];
        });

        document.querySelector("#linha"+[i]).addEventListener("mouseleave",a=>{
        this.foto.src = "img/default.png"
        document.getElementById("attrdesc").innerHTML= "Conte-nos sobre você! O Vault-Tec precisa saber que tipo de cidadão você é para garantir sua felicidade futura.";
        });

    }


    }
    atualizarNome(){
        this.nome=document.getElementById("nomeInput").value;
        this.salvar();
    }
    atualizarTotal(){
        document.getElementById('pontostudo').innerHTML = this.pontosTotais;
        this.salvar();
    }
    atualizarPontos(alterado){
        let novoValor = parseInt(document.getElementById(this.listaNomes[alterado]).value);
        if(this.pontosTotais > 0 && novoValor > this.listaPontos[alterado]){
            this.pontosTotais = this.pontosTotais - 1;
            this.listaPontos[alterado] = novoValor;
            this.atualizarTotal();
        } else if (novoValor < this.listaPontos[alterado]){
            this.pontosTotais = this.pontosTotais + 1;
            this.listaPontos[alterado] = novoValor;
            this.atualizarTotal();
        } else {
            document.getElementById(this.listaNomes[alterado]).value = this.listaPontos[alterado];
            //alert("Você não tem mais pontos :(\n Diminua um atributo para conseguir os pontos de volta");
        }
    }
    criarInputs(){
        this.carregar();
        for(let i=0; i<this.listaNomes.length; i++){
            document.getElementById('atributos').innerHTML += `<div id='linha${[i]}' class="linhas" ><label type="number" class="label">${this.listaNomes[i]}</label> 
            <div class="betenes">
            <button class="btnmenos" onclick="this.nextElementSibling.stepDown();atributos.atualizarPontos(${i})" > ◄ </button> 
            <input id='`+this.listaNomes[i]+`' type=number value='${atributos.listaPontos[i]}' min='0' max='10' onchange="atributos.atualizarPontos(${i})">
            <button class="btnmais" onclick="this.previousElementSibling.stepUp();atributos.atualizarPontos(${i})" > ► </button>
            </div>
            </div>`;
        }
        document.getElementById('atributos').innerHTML += `<div id="ptsrest">
        <div class="inline"><p id="pontostudo"></p><p>Pontos Restantes</p></div>
        <br> <button onclick="atributos.resetar()" id="reset">[ Resetar ]</button> </div> `
    }
    resetar(){
        if (confirm("Você tem certeza que quer apagar sua ficha?")) {
            localStorage.clear();
            window.location.reload(1);
        }
    }

    salvar(){
        localStorage.clear();
        let listaPontosSave = JSON.stringify(this.listaPontos);
        let pontosTotaisSave = JSON.stringify(this.pontosTotais);
        let nomeSave = JSON.stringify(this.nome);

        if (this.nome != null || this.nome != undefined) {
            localStorage.setItem("nomeSave", nomeSave);
        }
        localStorage.setItem("listaPontosSave", listaPontosSave);
        localStorage.setItem("pontosTotaisSave", pontosTotaisSave);
    }
    carregar(){
        let listaPontosSave = JSON.parse(localStorage.getItem("listaPontosSave"));
        let pontosTotaisSave = JSON.parse(localStorage.getItem("pontosTotaisSave"));
        let nomeSave = JSON.parse(localStorage.getItem("nomeSave"));
        if (listaPontosSave != null && listaPontosSave != "") {
            this.listaPontos = listaPontosSave;
            this.pontosTotais = pontosTotaisSave;
            this.nome = nomeSave;
            if(this.nome != null && this.nome != "") {
                document.getElementById("nomeInput").setAttribute("value", atributos.nome);
            }
        }else{
            for(let i=0; i<this.listaNomes.length; i++){
                this.listaPontos[i]=0;
            }
        }
    }
}

let atributos = new Atributos;
atributos.listaNomes = ['Força' ,'Percepção', 'Resistência', 'Carisma', 'Inteligência' , 'Agilidade','Sorte'];
atributos.criarInputs();
atributos.atualizarTotal();
atributos.trocarfoto();
