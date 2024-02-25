import React from 'react';
import EChartsReact from 'echarts-for-react';
import { useTranslation } from "react-i18next";

function  Circle({s}) {

    const {t} = useTranslation()
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },  
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: s.completed, name:  `${t("circle1")}`},
                    {value: s.pending, name:`${t("circle2")}`},
                    {value: s.cansel, name: `${t("circle3")}`}
                ]
            }
        ]
    };

    return (
        <div>
            <div className="backCircle p-5">
                <div className='flex justify-around md:w-78 md:ml-0 text-2xl'>
                    <p>{s.completed}</p>
                    <p>{s.pending}</p>
                </div>
                <div style={{
                    height: '300px',
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    <EChartsReact
                        option={option}
                        style={{height: '100%', width: '100%'}}
                    />
                </div>
            </div>
        </div>
    );
}

export default Circle;
