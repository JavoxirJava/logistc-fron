import React from 'react';
import "../../index.css"
import { useTranslation } from "react-i18next";
import EChartsReact from 'echarts-for-react';

function LineChart({ productStatistics2 }) {
  const { t } = useTranslation()

  const option = {
    tooltip: {
      formatter: function (params) {
        const { seriesName, value } = params;
        return `${t('projectCount')}: ${value[1]} <br/> ${t('card2')}: ${value[2]} <br/> ${t('produkt')}: ${seriesName}`;
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

  productStatistics2.forEach(item => {
    option.xAxis.data.push(`${item.month} ${item.year}`);
    option.series.push({
      name: item.names[0],
      type: 'bar',
      data: [[`${item.month} ${item.year}`, item.names.length, item.status]]
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
