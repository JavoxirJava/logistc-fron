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
      formatter: function (params) {
        let tooltip = params[0].axisValueLabel + '<br/>'; // Tooltip uchun sarlavha
        params.forEach(param => {
          tooltip += param.data.status + ': ' + param.data.result + "<br/>"; // Statusni qo'shish
          // tooltip += param.data.result; // Resultni qo'shish
        });
        return tooltip;
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
        // stack: 'total',
        data: productStatistics2.map(product => ({
          value: product[key].result,
          status: product[key].status,
          result: product[key].result
        }))
      }));

    option.series = seriesData;
  }

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
