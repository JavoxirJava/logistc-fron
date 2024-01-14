import React from 'react';
import EChartsReact from 'echarts-for-react';

function LineChart() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 23, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };

  return (
    <div>
      <div className="bg-white p-5">
        <div style={{ height: '400px', width: '100%', display: "flex", flexDirection: "column" }}>
          <EChartsReact
            option={option}
            style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
