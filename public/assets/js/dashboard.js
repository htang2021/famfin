async function createMember(event) {
	
	event.preventDefault();
	
	const createInput = {
		first_name: document.querySelector('#create-first-name').value.trim(),
		last_name: document.querySelector('#create-last-name').value.trim(),
		relationship: document.querySelector('#create-relationship').value,
		is_user: false,
		user_id: 1
		// change line 10 to get user id for logged in user
	};
	
	console.log(createInput);
	
	if (createInput.first_name && createInput.last_name) {
		const response = await fetch('/api/member', {
			method: 'post',
			body: JSON.stringify(createInput),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
	
}


document.querySelector('#add-member-form').addEventListener('submit', createMember);