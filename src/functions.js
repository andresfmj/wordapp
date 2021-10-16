const API = 'http://localhost:3010';

export const inputChangedHandler = (event) => {
	console.log(event, event.target.name, event.target.value);
};

export const formSubmitHandler = (event) => {
	event.preventDefault();
	event.stopPropagation();

	console.log(event, event.target);

	// postNewTempItem('aloha1233', 98, 'yuuuuu1233');
};

/*
const postNewTempItem = async (name, age, lastName) => {
	try {
		const request = await fetch(`${API}/api/temp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				age,
				lastName,
			}),
		});
		const response = await request.json();
		console.log(response);
	} catch (error) {
		console.log(error);
	}
	return;
};
*/
