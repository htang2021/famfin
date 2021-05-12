// search for a stock and add it to the database
const buyStock = async (event) => {
	event.preventDefault();

	const response = await fetch(
		`/api/quote/${document.querySelector('#stock').value.trim()}`
	);
	const initialCost = await response.json();

	if (!initialCost.quote) {
		UIkit.notification({ message: 'Stock not found', status: 'danger' });
		return;
	}

	const buyInput = {
		stock_name: document.querySelector('#stock').value.trim().toUpperCase(),
		quantity: parseInt(document.querySelector('#quantity').value),
		initial_cost: initialCost.quote * document.querySelector('#quantity').value,
		member_id: document.querySelector('#member-choice').value,
	};

	console.log(buyInput);

	if (buyInput.stock_name && buyInput.quantity) {
		const response = await fetch('/api/fund', {
			method: 'post',
			body: JSON.stringify(buyInput),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			UIkit.notification({ message: response.statusText, status: 'danger' });
		}
	}
};

// calculate new value and sell stock
const sellStock = async (event) => {
	event.preventDefault();
	
	// get selected stock
	const response1 = await fetch(`/api/fund/stock/${document.querySelector('#sell-stock-choice').value}`)
	const stock = await response1.json()
	
	// console.log(stock);
	
	// query API for current stock info
	const response2 = await fetch(`/api/quote/${stock[0].stock_name}`);
	const totalPrice = await response2.json();
	
	// console.log(totalPrice.quote);

	// save form values to an object
	const sellInput = {
		quantity: parseInt(document.querySelector('#sell-quantity').value),
		total_price: totalPrice.quote * parseInt(document.querySelector('#sell-quantity').value)
	};
	
	console.log(sellInput);
	
	// check to see if quantity input is greater than, equal to, or less than the available quantity
	if (sellInput.quantity === stock[0].quantity) {
		// compare total value stored in database with new total value and display profit/loss
		// delete stock from fund route
	} else if (sellInput.quantity > stock[0].quantity) {
		UIkit.notification({ message: "You can't sell more stock than you own!", status: 'danger' });
	} else {
		
		// compare total value stored in database with new total value and display profit/loss
		
		// create object with new values to pass into stock table via put request
		const sellRequest = {
			quantity: stock[0].quantity - sellInput.quantity,
			initial_cost: stock[0].initial_cost - sellInput.total_price
		}

		console.log(sellRequest);
		
		// put new data in stock table by id
		const response3 = await fetch(`/api/fund/${document.querySelector('#sell-stock-choice').value}`, {
			method: 'put',
			body: JSON.stringify(sellRequest),
			headers: { 'Content-Type': 'application/json' },
		});
		console.log(response3);
		
	}
	
};

// populate stock dropdown for sell form
const getMemberStocks = async () => {
	document.querySelector('#sell-stock-choice').innerHTML = '';

	const memberId = document.querySelector('#sell-member-choice').value;

	const response = await fetch(`/api/member/${memberId}`);
	const member = await response.json();

	for (let i = 0; i < member.funds.length; i++) {
		document.querySelector(
			'#sell-stock-choice'
		).innerHTML += `<option value="${member.funds[i].id}">${member.funds[i].stock_name}</option>`;
	}
};

getMemberStocks();

// Event Listeners
document.querySelector('#buy-stock').addEventListener('submit', buyStock);
document.querySelector('#sell-stock').addEventListener('submit', sellStock);
