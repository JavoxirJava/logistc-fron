import React from 'react';
import "../../index.css"
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
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let tooltip = params[0].axisValueLabel + '<br/>';
        params.forEach(param => {
          tooltip += param.data.status + ': ' + param.data.result + "<br/>";
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
        name: productStatistics2[0][key].status,
        type: 'bar',
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
