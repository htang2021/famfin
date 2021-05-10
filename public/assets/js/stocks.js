const getCurrentPrice = async (ticker) => {
	await fetch(`/api/quote/${ticker}`)
	.then(response => response.json())
	.then(data => {
		return data;	
	});
}


const buyStock = async (event) => {
	event.preventDefault();
	
	// const initialCost = await getCurrentPrice(document.querySelector('#stock').value.trim());
	
	const response1 = await fetch(`/api/quote/${document.querySelector('#stock').value.trim()}`);
	const initialCost = await response1.json();
	
	if (!initialCost.quote) {
		alert("This is not a stock");
		return;
	}
	
	const buyInput = {
		stock_name: document.querySelector('#stock').value.trim(),
		quantity: parseInt(document.querySelector('#quantity').value),
		initial_cost: initialCost.quote * document.querySelector('#quantity').value,
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
			// document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
	
}

document.querySelector('#buy-stock').addEventListener('submit', buyStock);
