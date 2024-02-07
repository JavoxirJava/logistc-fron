import React from 'react';
import EChartsReact from 'echarts-for-react';

function LineChart({productStatistics2}) {
  const option = {
    xAxis: {
      type: 'category',
      data: productStatistics2.map(product => product.month)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: productStatistics2.map(product => product.pending),
        type: 'line',
        areaStyle: {}
      }
    ]
  };

  return (
    <div className='pt-10'>
      <div className="backCircle ">
        <div style={{ height: '400px', width: '100%', display: "flex", flexDirection: "column", }}>
          <EChartsReact option={option}
            style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems:"center"}}
          />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
