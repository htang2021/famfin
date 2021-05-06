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
		firstName: document.querySelector("#first-name").value.trim(),
		lastName: document.querySelector("#last-name").value.trim(),
		email: document.querySelector("#signup-email").value.trim(),
		password: document.querySelector("#signup-password").value
	};
	
	console.log(signupInput);
	
	if (signupInput.firstName && signupInput.lastName && signupInput.email && signupInput.password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify(signupInput),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector("#login-form").addEventListener("submit", loginHandler);
document.querySelector("#signup-form").addEventListener("submit", signupHandler);