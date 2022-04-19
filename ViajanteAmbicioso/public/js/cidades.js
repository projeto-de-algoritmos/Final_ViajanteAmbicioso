

function gera() {
	console.log('entrei');
	var destino = "capital-destino";
	var origem = "capital-origem";
	var capital = [
		"Aracajú",
		"Belém",
		"Belo Horizonte",
		"Boa Vista",
		"Brasília",
		"Campo Grande",
		"Cuiabá",
		"Curitiba",
		"Florianópolis",
		"Fortaleza",
		"Goiânia",
		"João Pessoa",
		"Maceió",
		"Manaus",
		"Natal",
		"Palmas",
		"Porto Alegre",
		"Porto Velho",
		"Recife",
		"Rio Branco",
		"Rio de Janeiro",
		"Salvador",
		"São Luis",
		"São Paulo",
		"Teresina",
		"Vitória"]

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


