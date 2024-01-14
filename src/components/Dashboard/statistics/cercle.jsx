import React from 'react';
import EChartsReact from 'echarts-for-react';

function Circle() {
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
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md p-5">
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

export default Circle;
