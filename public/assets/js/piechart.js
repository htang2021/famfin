async function makeChart() {
  const stockPrices = {};
  const response = await fetch("/api/member/family");
  const membersData = await response.json();

  // return array of {}s with labels and quantity keys
  const initialState = { labels: [], quantity: [] };


  // Get all of the tickers per person
  const mannysTickers = [];
  membersData.forEach((member) => {
    member.funds.forEach((fund) => {
      if (!mannysTickers.includes(fund.stock_name)) {
        mannysTickers.push(fund.stock_name);
      }
    });
  });

  for (const ticker of mannysTickers) {
    console.log(ticker);
    const responseTick = await fetch(`/api/quote/${ticker}`);
    const resData = await responseTick.json();
    stockPrices[ticker] = resData.quote;
  }

  membersData.forEach((member) => {
    member.funds.forEach((fund) => {
      fund.totalValue = stockPrices[fund.stock_name] * fund.quantity;
    });
  });
//   console.log(stockPrices);
//   console.log(membersData);

  // Query for each one of those tickers
  const result = membersData.reduce(reducer, initialState);
  // save the value of each ticker in an object

  // loop through each members
  // and for each member loop their funds property
  // for each fund look at the price of the ticker and set a value called totalValue
  // by doing some math
  // accumulator, current
  function reducer(resultObject, member) {
    member.funds.forEach((fund) => {
      if (resultObject[fund.stock_name]) {
        resultObject[fund.stock_name] += fund.totalValue;
      } else {
        resultObject[fund.stock_name] = fund.totalValue;
      }
      resultObject.labels.push(
        `${member.first_name} ${
          member.last_name
        }: ${fund.stock_name.toUpperCase()}`
      );
      console.log(fund);
      resultObject.quantity.push(fund.totalValue);
    });
    return resultObject;
  }
  console.log(result.labels);
  console.log(result.quantity);

  // get all keys from result obj
  const tickers = Object.keys(result).filter((key) => {
    return key !== "labels" && key !== "quantity";
  });

//   async function tickerReducer(priceData, ticker) {
//     const promises = [];
//     try {
//       const tickerData = await fetch(`/api/quote/${ticker}`);
//       console.log(tickerData);
//       priceData[ticker] = tickerData;
//       promises.push(tickerData);
//     } catch (error) {
//       console.log(error);
//     }
//     return priceData;
//   }

  //   const moreData = await Promise.all(promises);
  //   console.log(moreData);
  // for (var i = 0; i < data.length; i++) {
  //   for (var j = 0; j < data[i].funds.length; j++) {

  //     //   for loop, loop through data[i], create total variable, store total
  //     // let ticker = data[i].funds[j].stock_name;
  //     // fetch(`/api/quote/${ticker}`)
  //     //   .then((res) => res.json())
  //     //   .then((moreData) => {
  //     //     console.log(moreData);
  //     //   });
  //     quantity.push(data[i].funds[j].quantity);
  //     // console.log(quantity);
  //     //   }
  //     //   if (userQuantity > 0) {
  //     // quantity.push(userQuantity);
  //     labels.push(
  //       data[i].first_name +
  //         " " +
  //         data[i].last_name +
  //         ": " +
  //         data[i].funds[j].stock_name.toUpperCase()
  //     );
  //   }
  // }

  const element = document.getElementById("myChart");
  // const config = {
  //   type: "pie",
  //   chartData,
  //   options: {},
  // };
  console.log(result);
  const chartData = new Chart(element, {
    type: "pie",
    data: {
      labels: result.labels,
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
          data: result.quantity,
        },
      ],
    },
  });
  // var myChart = new Chart(document.getElementById("myChart"), config);
}

makeChart();

document.querySelector("#buy-stock").addEventListener("submit", makeChart);
