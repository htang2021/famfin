async function createMember(event) {
	
	event.preventDefault();
	
	const createInput = {
		first_name: document.querySelector('#create-first-name').value.trim(),
		last_name: document.querySelector('#create-last-name').value.trim(),
		relationship: document.querySelector('#create-relationship').value,
		is_user: false
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

async function deleteMember(event) {
	// memberId = targetElement.closest('tr');
	// console.log(memberId);
	alert('You clicked the thing!');
}


async function buyStock(event) {
	event.preventDefault();
	
	const buyInput = {
		stock_name: document.querySelector('#stock').value,
		quantity: document.querySelector('#quantity').value,
		initial_cost: 1,
		member_id: document.querySelector('#member-choice').value,
	};
	
	console.log(buyInput);
	
	if (buyInput.stock_name && buyInput.quantity) {
		const response = await fetch('/api/fund', {
			method: 'post',
			body: JSON.stringify(buyInput),
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
document.querySelector('#buy-stock').addEventListener('submit', buyStock);
// document.getElementsByClassName('.delete').addEventListener('click', deleteMember);