import React, { useState } from 'react';
import EChartsReact from 'echarts-for-react';
import { useTranslation } from "react-i18next";
import "../../index.css"

function Circle({ s }) {
    const [circleData, setCircleData] = useState(s['data-1'])

    const { t } = useTranslation()
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom:'79%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                position:"absolute",
                top:'10%',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: circleData.map(item => {
                    return {value: item.names.length, name: item.status}
                })
            }
        ]
    }
    return (
        <div>
            <div className="backCircle rounded-lg p-5 ">
               
                <div style={{
                    height: '360px',
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    <EChartsReact
                        option={option}
                        style={{ height: '100%', width: '100%',  }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Circle;
