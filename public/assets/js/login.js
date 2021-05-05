// const login = event => {
// 	event.preventDefault();
// 	alert("Button clicked!")
// }
// 
// const signUp = event => {
// 	event.preventDefault();
// 	alert("Button clicked!")
// }

async function loginHandler(event) {
		event.preventDefault();
		const loginInput = {
			email: document.querySelector("#login-email").value.trim(),
			password: document.querySelector("#login-password").value
		};
		
		console.log(loginInput);
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
}

document.querySelector("#login-form").addEventListener("submit", loginHandler);
document.querySelector("#signup-form").addEventListener("submit", signupHandler);