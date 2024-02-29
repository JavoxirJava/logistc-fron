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

// kerak bub qolishi mumkin. agar kerak bulsa olib taxrirlab ishlatilaveradi...
// import React from 'react';
// import "../../index.css"
// import { useTranslation } from "react-i18next";
// import EChartsReact from 'echarts-for-react';

// function LineChart({ productStatistics2 }) {
//   const { t } = useTranslation()

//   const groupedData = {};
//   productStatistics2.forEach(item => {
//     const key = `${item.year}-${item.month}`;
//     if (!groupedData[key]) {
//       groupedData[key] = {
//         month: item.month,
//         year: item.year,
//         names: [],
//         status: []
//       };
//     }
//     groupedData[key].names.push(...item.names); // Spread operator to push all names
//     groupedData[key].status.push(item.status);
//   });
  
//   const currentDate = new Date();
//   let currentYear = currentDate.getFullYear();
//   let currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

//   const option = {
//     tooltip: {
//       formatter: function (params) {
//         const { seriesName, value } = params;
//         const projectName = seriesName.split(',').join('<br/>');
//         return `${t('projectCount')}: ${value[1]} <br/> ${t('card2')}: ${value[2]} <br/> ${t('produkt')}: ${projectName}`;
//       }
//     },
//     xAxis: {
//       type: 'category',
//       data: []
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: []
//   };

//   for (let i = 5; i >= 0; i--) {
//     let month = currentMonth - i;
//     let year = currentYear;
//     if (month <= 0) {
//       month += 12;
//       year -= 1;
//     }
//     const key = `${year}-${month}`;
//     const dataItem = groupedData[key] || { names: [], status: [] };
//     option.xAxis.data.push(`${month} ${year}`);
//     option.series.push({
//       name: dataItem.names.join(', '),
//       type: 'bar',
//       data: [[`${month} ${year}`, dataItem.names.length, dataItem.status]]
//     });
//   }

//   return (
//     <div className=''>
//       <div className="backCircle rounded-lg">
//         <div style={{ height: '400px', padding: '1rem', paddingBottom: '0', width: '100%', display: "flex", flexDirection: "column", }}>
//           <EChartsReact option={option}
//             style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LineChart;
