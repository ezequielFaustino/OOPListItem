const buttons = document.querySelectorAll("#buttons-container button");
//pegar valor dos input
const inputProduto = document.querySelector("#produto");
const inputValor = document.querySelector("#valor");
//inputProduto.value = "Teste";
//inputValor.value = "56.45";

class Produto{
    constructor(){
        this.id = 1;
        //array dos produtos
        this.arrayProdutos = [];
        this.editId = null;

    }

    salvar(add){
        let produto = this.lerDados();
        if(this.validaCampo(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            }else{
                this.atualizar(this.editId, produto);
            }
        }
        //console.log(produto);
        //console.log(this.arrayProdutos);
        this.listaTabela();
        this.cancelar();
    }

    listaTabela(){
        let tbody = document.querySelector("#tbody");
        tbody.innerText = "";
        let tr, tdId, tdProd, tdValor, tdAcao;
        for(let i = 0; i < this.arrayProdutos.length; i++){
            tr = tbody.insertRow(); //criar uma nova linha
            tdId = tr.insertCell(); //inserir uma nova coluna
            tdProd = tr.insertCell();
            tdValor = tr.insertCell();
            tdAcao = tr.insertCell();

            //InnerText p/ cada posicao no array
            tdId.innerText = this.arrayProdutos[i].id;
            tdProd.innerText = this.arrayProdutos[i].nomeProduto;
            tdValor.innerText = this.arrayProdutos[i].valor;

            //editar items
            let imgEdit = document.createElement('img');
            imgEdit.src = '../img/editar.png';
            imgEdit.style.cursor = 'pointer';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+JSON.stringify(this.arrayProdutos[i])+")");
            tdAcao.appendChild(imgEdit);

            //deletar items
            let imgDel = document.createElement('img');
            imgDel.src = '../img/excluir.png';
            imgDel.style.cursor = 'pointer';
            imgDel.setAttribute("onclick", "produto.deletar("+this.arrayProdutos[i].id+")");
            tdAcao.appendChild(imgDel);

            //console.log(this.arrayProdutos);
        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto); //adiciona os campos produto e valor
        this.id++;
    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;
        document.querySelector("#btn-um").innerText = "ATUALIZAR";
    }

    lerDados(){
        let produto = {};
        produto.id = this.id;
        produto.nomeProduto = inputProduto.value;
        produto.valor = inputValor.value;
        return produto;
    }

    validaCampo(produto){
        let msg = "";
        if(produto.nomeProduto === ""){
            msg+= `--> diga o nome do produto\n`;
        }
        if(produto.valor === ""){
            msg+= `--> diga o valor do produto!!\n`;
        }

        if(msg != ""){
            alert(msg);
            return false;
        }
        return true;
    }

    cancelar(cancela){
        document.getElementById('produto').value = "";
        document.getElementById('valor').value = "";
        document.getElementById('btn-um').innerText = "SALVAR";
        this.editId = null;
    }

    deletar(id){
        //console.log(this.arrayProdutos);
        //alert(`deletar o id ${id}`);
        let tbody;
        if(confirm(`Confirmar exclusão do produto? ID = ${id}`)){
            tbody = document.getElementById('tbody');
            //percorrer a lista de produtos e deletar pelo id
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id === id){
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}
const produto = new Produto();

buttons.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        const value = e.target.innerText;
        //console.log(value);
        if((value === "SALVAR") || (value === "ATUALIZAR")){
            produto.salvar(value);
        }else if((value === "CANCELAR")){
            produto.cancelar(value);
        }
    })
})

