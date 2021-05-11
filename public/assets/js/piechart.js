// fetch (`/api/quote/${ticker}`)
fetch("/api/member/family")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);


    for (var i = 0; i < data[i].funds.length; i++) {
        let ticker = data[i].funds[j].stock_name;
      fetch(`/api/quote/${ticker}`)
        .then((res) => res.json())
        .then((moreData) => {
          console.log(moreData);
        });

    
    }
    const labels = [];
    const quantity = [];
    // find number of unique stocks
    // for each unique stock, create a new obj with an array, loop over each value
    // if value matches one of array stocks, place into corresponding array

    // for (var i = 0; i < data.length; i++) {
      //   let userQuantity = 0;

        for (var j = 0; j < data[i].funds.length; j++) {
      // userQuantity += data[i].funds[j].quantity;
      //   for loop, loop through data[i], create total variable, store total
      quantity.push(data[i].funds[j].quantity);
      // console.log(quantity);
      //   }
      //   if (userQuantity > 0) {
      // quantity.push(userQuantity);
      labels.push(
        data[i].first_name +
          " " +
          data[i].last_name +
          ": " +
          " " +
          data[i].funds[j].stock_name.toUpperCase()
      );
      //   }
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
            label: "Members",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            data: quantity,
          },
        ],
      },
    });
    // var myChart = new Chart(document.getElementById("myChart"), config);
  });

//   document.querySelector('#buy-stock').addEventListener('submit', makePie);
