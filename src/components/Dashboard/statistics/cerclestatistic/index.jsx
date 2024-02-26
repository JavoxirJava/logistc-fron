import React from 'react';
import EChartsReact from 'echarts-for-react';
import { useTranslation } from "react-i18next";
import "../../index.css"

function Circle({ s }) {
    console.log(s);

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
                data: [
                    { value: s.Падгатовка, name: `${t("1")}` },
                    { value: s["В граница узб"], name: `${t("2")}` },
                    { value: s["В гроница в Китай"], name: `${t("3")}` },
                    { value: s[" В пути в Китай"], name: `${t("4")}` },
                    { value: s["В пути в транзитном зоне"], name: `${t("5")}` },
                    { value: s.Гатова, name: `${t("6")}` },
                    { value: s.Загрузка, name: `${t("7")}` },
                    { value: s.Отправка, name: `${t("8")}` },
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
