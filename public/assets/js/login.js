async function loginHandler(event) {
	event.preventDefault();
	
	const loginInput = {
		email: document.querySelector("#login-email").value.trim(),
		password: document.querySelector("#login-password").value
	};
	
	console.log(loginInput);
	
	if (loginInput.email && loginInput.password) {
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify(loginInput),
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
}

async function signupHandler(event) {
	event.preventDefault();
	
	const signupInput = {
		first_name: document.querySelector("#first-name").value.trim(),
		last_name: document.querySelector("#last-name").value.trim(),
		email: document.querySelector("#signup-email").value.trim(),
		password: document.querySelector("#signup-password").value
	};
	
	const signupMember = {
		first_name: document.querySelector("#first-name").value.trim(),
		last_name: document.querySelector("#last-name").value.trim(),
		is_user: 1,
		relationship: 'Self'
	};
	
	console.log(signupInput);
	console.log(signupMember);
	
	if (signupInput.first_name && signupInput.last_name && signupInput.email && signupInput.password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify(signupInput),
			headers: { 'Content-Type': 'application/json' }
		});
		
		const response2 = await fetch('/api/member', {
			method: 'post',
			body: JSON.stringify(signupMember),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok && response2.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector("#login-form").addEventListener("submit", loginHandler);
document.querySelector("#signup-form").addEventListener("submit", signupHandler);