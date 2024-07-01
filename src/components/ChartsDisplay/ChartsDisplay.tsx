import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import data from "./chartsData.json";

const ChartsDisplay: React.FC = () => {
  const [messageData, setMessageData] = useState<any[]>([]);
  const [callData, setCallData] = useState<any[]>([]);

  useEffect(() => {
    // Assuming data.json structure matches the example provided
    if (data && data.messages && data.calls) {
      setMessageData(data.messages);
      setCallData(data.calls);
    }
  }, []);

  const messageChartOptions: Highcharts.Options = {
    title: {
      text: "Message Statistics",
    },
    xAxis: {
      categories: messageData.map((entry) => entry.date),
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },
    series: [
      {
        type: "line",
        name: "Sent",
        data: messageData.map((entry) => entry.sent),
        color: "#1f77b4",
      },
      {
        type: "line",
        name: "Received",
        data: messageData.map((entry) => entry.received),
        color: "#2ca02c",
      },
      {
        type: "line",
        name: "Failed",
        data: messageData.map((entry) => entry.failed),
        color: "#d62728",
      },
    ],
  };

  const callChartOptions: Highcharts.Options = {
    title: {
      text: "Call Statistics",
    },
    xAxis: {
      categories: callData.map((entry) => entry.date),
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },
    series: [
      {
        type: "line",
        name: "Sent",
        data: callData.map((entry) => entry.sent),
      },
      {
        type: "line",
        name: "Received",
        data: callData.map((entry) => entry.received),
      },
    ],
  };

  return (
    <div>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={messageChartOptions}
        />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={callChartOptions} />
      </div>
    </div>
  );
};

export default ChartsDisplay;
