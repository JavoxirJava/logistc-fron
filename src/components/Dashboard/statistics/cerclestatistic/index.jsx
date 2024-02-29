import React, { useState } from "react";
import EChartsReact from "echarts-for-react";
import { useTranslation } from "react-i18next";
import "../../index.css";

function Circle({ s }) {
  const { t } = useTranslation();


  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "79%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        position: "absolute",
        top: "10%",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: s
          ? s.map((item) => {
              return { value: item.names.length, name: item.status };
            })
          : [
              { value: 1, name: t("1") },
              { value: 1, name: t("2") },
              { value: 1, name: t("3") },
              { value: 1, name: t("4") },
              { value: 1, name: t("5") },
              { value: 1, name: t("6") },
              { value: 1, name: t("7") },
              { value: 1, name: t("8") },
              { value: 1, name: t("9") },
            ],
      },
    ],
  };
  return (
    <div>
      <div className="backCircle rounded-lg p-5 ">
        <div
          style={{
            height: "360px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <EChartsReact
            option={option}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Circle;
