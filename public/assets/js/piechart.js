const newValueArray = [];
const gainsArray = [];

async function makeChart() {
  const stockPrices = {};
  const response = await fetch("/api/member/family");
  const membersData = await response.json();
  console.log(membersData);

  let gain = "";
  // return array of {}s with labels and quantity keys, and tooltip labels
  const initialState = { labels: [], quantity: [], labelsTooltip: [] };

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
    // console.log(ticker);
    const responseTick = await fetch(`/api/quote/${ticker}`);
    const resData = await responseTick.json();
    // resData =  {ticker: "nflx", quote: "495.08"}
    // console.log(resData);
    // stockPrices array at each individual ticker = 495.08
    stockPrices[ticker] = resData.quote;
    // console.log(stockPrices[ticker]);
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
  console.log(result);

  // save the value of each ticker in an object
  // loop through each members, for each member loop their funds property
  // for each fund look at the price of the ticker and set a value called totalValue
  // accumulator, currentValue
  function reducer(resultObject, member) {
    member.funds.forEach((fund) => {
      if (resultObject[fund.stock_name]) {
        resultObject[fund.stock_name] += fund.totalValue;
      } else {
        resultObject[fund.stock_name] = fund.totalValue;
      }
      const newValue = formatter.format(fund.totalValue);

      gainOrLoss =
        Math.round(
          ((fund.totalValue - fund.initial_cost) / fund.initial_cost) *
            100 *
            100
        ) / 100;
      if (gainOrLoss > 0) {
        gain = "Gain";
      } else if (gainOrLoss == 0) {
        gain = " Gain/Loss";
      } else {
        gain = "Loss";
      }

      // Create an array of gain/loss result
      resultObject.labelsTooltip.push(`${gain} of ${gainOrLoss}%`);

      console.log(resultObject);
      newValueArray.push(newValue);
      resultObject.quantity.push(fund.totalValue);
      console.log(resultObject.quantity);
      let convertedDate = moment(fund.createdAt);

      resultObject.labels.push(
        `${member.first_name} ${member.last_name}: ${
          fund.quantity
        } ${fund.stock_name.toUpperCase()} ${newValue}` + `${gain} of ${gainOrLoss}% since ${convertedDate.format("MMM Do YYYY, h:mmA")}`
      );
    });
    return resultObject;
  };

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
    options: {
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 18,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              console.log(context);
              return context.label;
            },
          },
        },
      },
    },
  });
}

makeChart();

document.querySelector("#buy-stock").addEventListener("submit", makeChart);
