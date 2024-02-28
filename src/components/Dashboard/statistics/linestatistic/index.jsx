import React from 'react';
import "../../index.css"
import EChartsReact from 'echarts-for-react';

function LineChart({ productStatistics2 }) {

  const option = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    series: []
  };

  // Processing statistics data
  productStatistics2.forEach((data, index) => {
    const seriesData = {
      name: `Data ${index + 1}`, // Change name accordingly
      type: 'bar',
      data: []
    };
    // Extracting data from each item
    data.forEach(item => {
      // Assuming each data item has only one entry
      for (const key in item) {
        if (item.hasOwnProperty(key) && item[key].length > 0) {
          item[key].forEach(entry => {
            seriesData.data.push(entry.projectName); // Pushing monthNumber as an example
          });
        }
      }
    });
    option.series.push(seriesData);
  });

  return (
    <div className=''>
      <div className="backCircle rounded-lg">
        <div style={{ height: '400px', padding: '1rem', paddingBottom: '0', width: '100%', display: "flex", flexDirection: "column", }}>
          <EChartsReact option={option}
            style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
