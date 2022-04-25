

function gera() {
	console.log('entrei');
	var destino = "capital-destino";
	var origem = "capital-origem";
	var capital = [
		"Aracaju",
		"Belem",
		"Belo Horizonte",
		"Boa Vista",
		"Brasilia",
		"Campo Grande",
		"Cuiaba",
		"Curitiba",
		"Florianopolis",
		"Fortaleza",
		"Goiania",
		"Joao Pessoa",
		"Maceio",
		"Manaus",
		"Natal",
		"Palmas",
		"Porto Alegre",
		"Porto Velho",
		"Recife",
		"Rio Branco",
		"Rio de Janeiro",
		"Salvador",
		"Sao Luis",
		"Sao Paulo",
		"Teresina",
		"Vitoria"]

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


