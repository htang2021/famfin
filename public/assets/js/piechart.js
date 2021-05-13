const newValueArray = [];

async function makeChart() {
  const stockPrices = {};
  const response = await fetch("/api/member/family");
  const membersData = await response.json();
  console.log(membersData);

  // return array of {}s with labels and quantity keys
  const initialState = { labels: [], quantity: [] };

  // Get all of the tickers per person ["nflx, "googl", "aapl", "msft"]
  const mannysTickers = [];
  membersData.forEach((member) => {
    member.funds.forEach((fund) => {
      if (!mannysTickers.includes(fund.stock_name)) {
        mannysTickers.push(fund.stock_name);
      }
    });
  });

  //   ticker is each individual ticker i.e. nflx
  for (const ticker of mannysTickers) {
    console.log(ticker);
    const responseTick = await fetch(`/api/quote/${ticker}`);
    const resData = await responseTick.json();
    // resData =  {ticker: "nflx", quote: "495.08"}
    console.log(resData);
    // stockPrices array at each individual ticker = 495.08
    stockPrices[ticker] = resData.quote;
    // 125.91
    console.log(stockPrices[ticker]);
  }

  membersData.forEach((member) => {
    //   loop through each
    member.funds.forEach((fund) => {
      fund.totalValue = stockPrices[fund.stock_name] * fund.quantity;
    });
  });
  //   console.log(stockPrices);
  //   console.log(membersData);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  // Query for each one of those tickers
  const result = membersData.reduce(reducer, initialState);
  // save the value of each ticker in an object

  // loop through each members
  // and for each member loop their funds property
  // for each fund look at the price of the ticker and set a value called totalValue
  // by doing some math
  // accumulator, currentValue
  function reducer(resultObject, member) {
    member.funds.forEach((fund) => {
      if (resultObject[fund.stock_name]) {
        resultObject[fund.stock_name] += fund.totalValue;
      } else {
        resultObject[fund.stock_name] = fund.totalValue;
      }
      const newValue = formatter.format(fund.totalValue);

      resultObject.labels.push(
        `${member.first_name} ${member.last_name}: ${
          fund.quantity
        } ${fund.stock_name.toUpperCase()} ${newValue}`
      );
      console.log(fund);

      newValueArray.push(newValue);
      resultObject.quantity.push(fund.totalValue);
      console.log(resultObject.quantity);
    });
    return resultObject;
  }
  console.log(result.labels);
  console.log(result.quantity);
  console.log(newValueArray);
  // get all keys from result obj
  //   const tickers = Object.keys(result).filter((key) => {
  //     return key !== "labels" && key !== "quantity";
  //   });

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

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

document.querySelector("#buy-stock").addEventListener("submit", makeChart);
