import React from 'react';
import EChartsReact from 'echarts-for-react';
import { useTranslation } from "react-i18next";
import "../../index.css"

function Circle({ s }) {
    const { t } = useTranslation()
    console.log(s); 
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
                data: [
                    { value: s.Падгатовка.result, name: `${t("1")}` },
                    { value: s["В граница узб"]['result'] ? s["В граница узб"]['result'] : 0, name: `${t("2")}` },
                    { value: s["В гроница в Китай"]['result'] ? s["В гроница в Китай"]['result'] : 0, name: `${t("3")}` },
                    { value: s["В процесс разтаможка"]['result'] ? s["В пути в Китай"]['result'] : 0, name: `${t("4")}` },
                    { value: s["В пути в транзитном зоне"]['result'] ? s["В пути в транзитном зоне"]['result'] : 0, name: `${t("5")}` },
                    { value: s.Гатова.result, name: `${t("6")}` },
                    { value: s.Загрузка.result, name: `${t("7")}` },
                    { value: s.Отправка.result, name: `${t("8")}` },
                ]
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
