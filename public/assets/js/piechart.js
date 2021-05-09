fetch("/api/member/family")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const labels = [];

    for (var i = 0; i < data.length; i++) {
      labels.push(data[i].first_name + " " + data[i].last_name);
    }

    console.log(labels);
    const element = document.getElementById("myChart");
    // const config = {
    //   type: "pie",
    //   chartData,
    //   options: {},
    // };
    const chartData = new Chart(element, {
      type: "pie",
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [30, 45],
        },
      ],
    });

    // let myChart = new Chart(document.getElementById("myChart"), config);
  });
