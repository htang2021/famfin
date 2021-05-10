fetch("/api/member/family")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const labels = [];
    const quantity = [];
// find number of unique stocks
// for each unique stock, create a new obj with an array, loop over each value
// if value matches one of array stocks, place into corresponding array

    for (var i = 0; i < data.length; i++) {
      let userQuantity = 0;

      for (var j = 0; j < data[i].funds.length; j++) {
        userQuantity += data[i].funds[j].quantity;
        //   for loop, loop through data[i], create total variable, store total
        // quantity.push(data[i].funds[j].quantity);
        console.log(quantity);
      }
      if (userQuantity > 0) {
        quantity.push(userQuantity);
        labels.push(data[i].first_name + " " + data[i].last_name + data[i].funds[0].stock_name);
      }
    }

    console.log(labels);
    const element = document.getElementById("myChart");
    // const config = {
    //   type: "pie",
    //   chartData,
    //   options: {},
    // };
    const chartData = new Chart(element, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: quantity,
          },
        ],
      },
    });
    // var myChart = new Chart(document.getElementById("myChart"), config);
  });
