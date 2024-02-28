import React from 'react';
import "../../index.css"
import EChartsReact from 'echarts-for-react';

function LineChart({ productStatistics2 }) {
  console.log(productStatistics2);
  const flattenedData = productStatistics2.flatMap(item => item.map(innerItem => innerItem));

  const option = {
    xAxis: {
      type: 'category',
      data: flattenedData.map(item => item.month)
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: flattenedData.reduce((legendData, item) => {
        const keys = Object.keys(item);
        const statusKeys = keys.filter(key => key !== 'month' && key !== 'year' && key !== 'monthNumber');
        statusKeys.forEach(statusKey => {
          if (item[statusKey] && item[statusKey].status && !legendData.includes(item[statusKey].status)) {
            legendData.push(item[statusKey].status);
          }
        });
        return legendData;
      }, [])
    },
    series: []
  };

  if (flattenedData.length > 0) {
    const seriesData = Object.keys(flattenedData[0])
      .filter(key => key !== 'month' && key !== 'year' && key !== 'monthNumber')
      .map(key => ({
        name: flattenedData[0][key] && flattenedData[0][key].status ? flattenedData[0][key].status : '',
        type: 'bar',
        data: flattenedData.map(item => item[key] && item[key].projectId ? item[key].projectId : 0) // Use 0 if projectId is undefined
      }));
    option.series = seriesData;
  }


  // [
  //   {
  //     "data-1": []
  //   }
  // ],
  // [
  //   {
  //     "data-2": []
  //   }
  // ],
  // [
  //   {
  //     "data-3": []
  //   }
  // ],
  // [
  //   {
  //     "data-4": []
  //   }
  // ],
  // [
  //   {
  //     "data-5": []
  //   }
  // ],
  // [
  //   {
  //     "data-6": [
  //       {
  //         "month": "February",
  //         "year": 2024,
  //         "monthNumber": 2,
  //         "projectName": "Project",
  //         "projectId": 1,
  //         "status": "Ready"
  //       }
  //     ]
  //   }
  // ]

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
