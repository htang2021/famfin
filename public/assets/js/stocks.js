// search for a stock and add it to the database
const buyStock = async (event) => {
	event.preventDefault();
		
	const response1 = await fetch(`/api/quote/${document.querySelector('#stock').value.trim()}`);
	const initialCost = await response1.json();
	
	if (!initialCost.quote) {
		UIkit.notification({message: 'Stock not found', status: 'danger'});
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
			document.location.replace('/dashboard');
		} else {
			UIkit.notification({message: response.statusText, status: 'danger'});
		}
	}
	
}





// Event Listeners
document.querySelector('#buy-stock').addEventListener('submit', buyStock);

