

function gera() {
	console.log('entrei');
	var destino = "capital-destino";
	var origem = "capital-origem";
	var capital = [
		"Aracaj�",
		"Bel�m",
		"Belo Horizonte",
		"Boa Vista",
		"Bras�lia",
		"Campo Grande",
		"Cuiab�",
		"Curitiba",
		"Florian�polis",
		"Fortaleza",
		"Goi�nia",
		"Jo�o Pessoa",
		"Macei�",
		"Manaus",
		"Natal",
		"Palmas",
		"Porto Alegre",
		"Porto Velho",
		"Recife",
		"Rio Branco",
		"Rio de Janeiro",
		"Salvador",
		"S�o Luis",
		"S�o Paulo",
		"Teresina",
		"Vit�ria"]

	geraElemento(capital, origem);
	geraElemento(capital, destino);

}
function geraElemento(lista, id) {
	let select = document.getElementById(id)
	for (let i = 0; i < lista.length; i++) {
		let option = document.createElement("option")
		option.value = lista[i]
		option.text = lista[i]
		select.appendChild(option)
	}

}

gera()


