import React from 'react';
import { useTranslation } from "react-i18next";
import EChartsReact from 'echarts-for-react';
import "../../index.css"

function LineChart({ productStatistics2 }) {
  const { t } = useTranslation();

  const option = {
    tooltip: {
      formatter: function (params) {
        const { seriesName, value } = params;
        const projectName = seriesName.split(',').join('<br/>');
        return `${t('projectCount')}: ${value[1]} <br/> ${t('card2')}: ${value[2]} <br/> ${t('produkt')}: ${projectName}`;
      }
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: []
  };

  let previousMonth = '';

  productStatistics2.forEach(item => {
    const monthYear = `${item.month} ${item.year}`;
    if (monthYear !== previousMonth) {
      option.xAxis.data.push(monthYear);
      previousMonth = monthYear;
    }
    option.series.push({
      name: item.names.join(', '),
      type: 'bar',
      data: [[monthYear, item.names.length, item.status]] // Assuming status array length represents count
    });
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
