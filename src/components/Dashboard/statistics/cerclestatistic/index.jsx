import React from 'react';
import EChartsReact from 'echarts-for-react';

function Circle({s}) {
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
                    { value: s.completedCount, name: 'Complete ' },
                    { value: s.pendingCount, name: 'Pending' },
                    { value: s.canselCount, name: 'Cancel' },

                ]
            }
        ]
    };

    return (
        <div>
            <div className="bg-white p-5">
                <div className='flex justify-around md:w-78 md:ml-0 text-2xl'>
                    <p>{s.completedCount}</p>
                    <p>{s.pendingCount}</p>
                    <p>{s.canselCount}</p>
                </div>
                <div style={{ height: '300px', width: '100%', display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    <EChartsReact
                        option={option}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div> 
            </div>
        </div>
    );
}

export default Circle;
