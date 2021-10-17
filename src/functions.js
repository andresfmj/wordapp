const API = 'http://wd.ferudinato.com:3010';
const special_chars = '!@#$%^&*()=+-_ñ`´<>?/|"{}[];:,.';

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
		// console.log(input, input.name, input.value);
		const value = input.value.trim();

		// es numero? se debe buscar el numero en el json, y luego con el id obtenido actualizar el acumulado
		// si no existe el numero, se ingresa como nuevo
		if (value.match(/^\d+$/)) {
			saveNumber(value);
			return;
		}

		// es solo texto? guardar el texto, el caracter inicial y el final
		if (value.match(/^[a-zA-Z ]+$/)) {
			saveText(value);
			return;
		}

		// tiene caracteres especiales? ( tildes,ñ,coma,punto,punto y coma,numeral )
		// extraer los caracteres especiales y descartar el string inicial
		// y cada caracter especial se guarda por separado
		let value_arr = value.split('');
		value_arr = value_arr
			.map((i) => {
				if (special_chars.indexOf(i) != -1) return i;
			})
			.filter((i) => i);

		if (value_arr.length > 0) {
			saveSpecialCharacter(value_arr);
			return;
		}
	} else {
		alert('Por favor digite un texto.');
	}
};

const saveSpecialCharacter = (value_arr) => {
	try {
		value_arr.forEach(async (i) => {
			let newSpecialCharacterAdded = await fetch(
				`${API}/api/caracteres`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						caracter: i,
					}),
				}
			);
			newSpecialCharacterAdded = await newSpecialCharacterAdded.json();
		});
		alert(`Caracteres especiales guardados: ${value_arr.join(', ')}`);
		resetInput();
	} catch (error) {
		console.log(error);
	}
};

const saveText = async (value) => {
	try {
		let findTextRequest = await fetch(`${API}/api/texto?texto=${value}`);
		findTextRequest = await findTextRequest.json();
		if (findTextRequest.length > 0) {
			alert(`Ya existe el texto: ${value}`);
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
			alert(
				`Texto guardado: ${value}. inicial: ${newTextAdded.inicial}, final: ${newTextAdded.final}`
			);
			resetInput();
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
			alert(
				`Acumulado del numero ${value} actualizado: ${updatedAccumulated.acumulado}`
			);
			resetInput();
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
			alert(`Numero guardado: ${value}`);
			resetInput();
		}
	} catch (error) {
		console.log(error);
	}
};

const resetInput = () => {
	input = {
		name: '',
		value: '',
	};
	const inputHTML = document.getElementById('input-text');
	inputHTML.value = '';
};
