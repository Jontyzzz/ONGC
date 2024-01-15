function getDataset(filter_Data, rawData, label_value, chartType = 'bar', colors) {
  const filteredData = rawData.filter((data) => filter_Data.includes(data.ParameterName.trim()));

  if (chartType === 'bar') {
    return {
      labels: filteredData.map(data => data.ParameterName),
      datasets: [
        {
          type: chartType,
          label: label_value,
          data: filteredData.map(data => parseFloat(data.ParameterValue)),
          backgroundColor: colors || [
            "rgba(43, 63, 229, 0.8)",
            "rgba(250, 192, 19, 0.8)",
            "rgba(253, 135, 135, 0.8)",
          ],
          borderRadius: 5,
        },
      ],
    };
  } else if (chartType === 'pie') {
    return {
      labels:filteredData.map(data => data.ParameterName),
      datasets: [
        {
          label: label_value,
          data:filteredData.map(data => parseFloat(data.ParameterValue)),
          backgroundColor:  [
            "rgba(43, 63, 229, 0.8)",
            "rgba(250, 192, 19, 0.8)",
            "rgba(253, 135, 135, 0.8)",
          ],
          hoverOffset: 5
        },
      ],
    };
  } else if (chartType === 'line') {
    return {
      labels: filteredData.map(data => data.ParameterName),
      datasets: [
        {
          type: 'line',
          label: label_value,
          data: filteredData.map(data => parseFloat(data.ParameterValue)),
          borderColor: colors || "rgba(43, 63, 229, 1)",
          backgroundColor: "rgba(43, 63, 229, 0.2)", // Optional: background color for the line
          borderWidth: 2,
          pointRadius: 4, // Optional: adjust the size of data points
        },
      ],
    };
  }
}


function getOptionsets(graph_title, max_range, index_Axis = 'x') {
  let scale_value = {
    x: { max: max_range },
    y: { max: max_range } // Include both x and y scales
  };

  if (index_Axis === 'y') {
    scale_value = {
      y: { max: max_range }
    };
  }
  if (index_Axis === 'x') {
    scale_value = {
      x: { max: max_range }
    };
  }

  return {
    plugins: {
      title: {
        text: graph_title,
      },
    },
    indexAxis: index_Axis,
    scales: scale_value
  };
}






// function getOptionsets(graph_title, max_range, index_Axis = 'x') {
//   let scale_value = {
//     x: { max: max_range },
//   };
//   if (index_Axis === 'y') {
//     scale_value = {
//       y: { max: max_range },   //[0] to give it in array//
//     };
//   }
//   return {
//     plugins: {
//       title: {
//         text: graph_title,
//       },
//     },
//     indexAxis: index_Axis,
//     scales: {
//       xAxes: [{
//           ticks: {
//               beginAtZero: true,
//               max: 10,
//               min: 0
//           }
//       }],
//       yAxes: [{
//           ticks: {
//               beginAtZero: false,
//               max: 1500,
//               min: 0
//           }
//       }]
//   },
//   };
// }

module.exports = { getDataset, getOptionsets };
