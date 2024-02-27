import React from 'react';
import "../../index.css"
import EChartsReact from 'echarts-for-react';

function LineChart({ productStatistics2 }) {
  const option = {
    xAxis: {
      type: 'category',
      data: productStatistics2.map(product => product.month)
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: Object.keys(productStatistics2[0])
        .filter(key => key !== 'month' && key !== 'year' && key !== 'monthNumber')
    },
    series: []
  };

  if (productStatistics2.length > 0) {
    const seriesData = Object.keys(productStatistics2[0])
      .filter(key => key !== 'month' && key !== 'year' && key !== 'monthNumber')
      .map(key => ({
        name: key,
        type: 'bar',
        data: productStatistics2.map(product => product[key])
      }));

    option.series = seriesData;
  }

  return (
    <div className=''>
      <div className="backCircle rounded-lg">
        <div style={{ height: '400px', width: '100%', display: "flex", flexDirection: "column", }}>
          <EChartsReact option={option}
            style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
