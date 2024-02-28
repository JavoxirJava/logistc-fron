import React from 'react';
import "../../index.css"
import { useTranslation } from "react-i18next";
import EChartsReact from 'echarts-for-react';

function LineChart({ productStatistics2 }) {
  const { t } = useTranslation()
  // console.log(productStatistics2);
  const option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        const projectCount = params.reduce((acc, curr) => acc + curr.data.z.length, 0);
        const projectName = params.reduce((acc, curr) => curr.data.z, 0);
        const month = params[0].axisValue;
        return `${month}<br/>Status count: ${projectCount}<br/>Status name: ${projectName}`;
      }
    },
    legend: {
      data: Object.keys(productStatistics2).filter(key => productStatistics2[key] !== null)
    },
    series: []
  };

  for (const key in productStatistics2) {
    if (productStatistics2.hasOwnProperty(key) && productStatistics2[key] !== null) {
      const data = productStatistics2[key];
      const seriesData = {
        name: key,
        type: 'bar',
        data: []
      };

      if (Array.isArray(data)) {
        data.forEach(item => {
          seriesData.data.push({
            x: item.month,
            y: item.names.length,
            z: [item.status]
          });
          if (!option.xAxis.data.includes(item.month)) {
            option.xAxis.data.push(item.month);
          }
        });
      } else {
        seriesData.data.push({
          x: data.month,
          y: data.names.length,
          z: [data.status]
        });
        if (!option.xAxis.data.includes(data.month)) {
          option.xAxis.data.push(data.month);
        }
      }

      option.series.push(seriesData);
    }
  }

  return (
    <div className=''>
      <div className="backCircle rounded-lg">
        <div style={{ height: '400px', padding: '1rem', paddingBottom: '0', width: '100%', display: "flex", flexDirection: "column", }}>
          <EChartsReact option={option}
            style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}
            // Custom tooltip to display names
            onEvents={{
              'mousemove': function (params) {
                const { seriesIndex, dataIndex } = params;
                const seriesName = option.series[seriesIndex].name;
                const data = option.series[seriesIndex].data[dataIndex];
                if (data) {
                  alert(`Project Count: ${data.y}\nStatus: ${data.z}\nSeries: ${seriesName}`);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
