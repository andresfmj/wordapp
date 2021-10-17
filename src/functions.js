const API = 'http://localhost:3010';

let input = {
	name: '',
	value: '',
};

export const inputChangedHandler = (event) => {
	input = {
		...input,
		name: event.target.name,
		value: event.target.value,
	};
};

export const formSubmitHandler = (event) => {
	event.preventDefault();
	if (input.name && input.value) {
		console.log(input, input.name, input.value);
		const value = input.value.trim();

		// es numero? se debe buscar el numero en el json, y luego con el id obtenido actualizar el acumulado
		// si no existe el numero, se ingresa como nuevo
		if (!isNaN(value)) {
			saveNumber(value);
		}

		// es solo texto? guardar el texto, el caracter inicial y el final
		if (isNaN(value)) {
			saveText(value);
		}

		// TODO:
		// tiene caracteres especiales? ( tildes,ñ,coma,punto,punto y coma,numeral )
		// extraer los caracteres especiales y descartar el string inicial
		// y cada caracter especial se guarda por separado
	} else {
		alert('Por favor digite un texto.');
	}
};

const saveSpecialCharacter = async (value) => {};

const saveText = async (value) => {
	try {
		let findTextRequest = await fetch(`${API}/api/texto?texto=${value}`);
		findTextRequest = await findTextRequest.json();
		if (findTextRequest.length > 0) {
			console.log('ya existe el texto', findTextRequest);
		} else {
			let newTextAdded = await fetch(`${API}/api/texto`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					texto: value,
					inicial: value.charAt(0),
					final: value.charAt(value.length - 1),
				}),
			});
			newTextAdded = await newTextAdded.json();
			console.log(newTextAdded);
		}
	} catch (error) {
		console.log(error);
	}
};

const saveNumber = async (value) => {
	try {
		let findNumberRequest = await fetch(
			`${API}/api/numeros?numero=${value}`
		);
		findNumberRequest = await findNumberRequest.json();
		if (findNumberRequest.length > 0) {
			const id = findNumberRequest[0].id;
			let updatedAccumulated = await fetch(`${API}/api/numeros/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...findNumberRequest[0],
					acumulado: findNumberRequest[0].acumulado + 1,
				}),
			});
			updatedAccumulated = await updatedAccumulated.json();
		} else {
			let newNumberAdded = await fetch(`${API}/api/numeros`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					numero: value,
					acumulado: 1,
				}),
			});
			newNumberAdded = await newNumberAdded.json();
		}
	} catch (error) {
		console.log(error);
	}
};

