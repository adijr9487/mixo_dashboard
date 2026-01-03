import { Column } from "@ant-design/charts";
import { Card } from "antd";

import { AggregateInsight, Insight } from "../api/types";

import {
  mapAggregateInsightToPlotData,
  mapInsightToPlotData,
} from "../utils/helper";

export const Plot = ({
  aggregateInsightData,
  specificInsightData,
  isLoading,
}: {
  aggregateInsightData: AggregateInsight | undefined;
  specificInsightData: Insight | undefined;
  isLoading: boolean | undefined;
}) => {
  const data = [];
  if (specificInsightData) {
    data.push(...mapInsightToPlotData(specificInsightData));
  }
  if (aggregateInsightData) {
    data.push(...mapAggregateInsightToPlotData(aggregateInsightData));
  }

  const config = {
    data,
    height: 250,
    xField: "label",
    yField: "value",
    colorField: "name",
    group: {
      padding: 0,
    },
  };
  return (
    <Card size="small" title="Plot" loading={isLoading}>
      <Column {...config} />
    </Card>
  );
};
