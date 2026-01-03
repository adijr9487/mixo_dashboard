import { Card } from "antd";

import { AggregateInsight, Insight } from "../api/types";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COMMON_METRICS = ["ctr", "cpc", "conversion_rate"] as const;

const mapInsightsToRechartData = (
  aggregate: AggregateInsight | undefined,
  insight: Insight | undefined
) => {
  return COMMON_METRICS.map((key) => ({
    name: key.replace(/_/g, " ").toUpperCase(),
    aggregate: aggregate?.insights[
      `avg_${key}` as keyof AggregateInsight["insights"]
    ] as number,
    insight: insight?.insights[key],
  }));
};

export const Plot = ({
  aggregateInsightData,
  specificInsightData,
  isLoading,
}: {
  aggregateInsightData: AggregateInsight | undefined;
  specificInsightData: Insight | undefined;
  isLoading: boolean | undefined;
}) => {
  const data = mapInsightsToRechartData(
    aggregateInsightData,
    specificInsightData
  );

  return (
    <Card size="small" title="Plot" loading={isLoading}>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: 254,
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="aggregate"
          orientation="left"
          stroke="#8884d8"
          width="auto"
        />
        <YAxis
          yAxisId="insight"
          orientation="right"
          stroke="#82ca9d"
          width="auto"
        />
        <Tooltip />
        <Legend />
        <Bar yAxisId="aggregate" dataKey="aggregate" fill="#8884d8" />
        <Bar yAxisId="insight" dataKey="insight" fill="#82ca9d" />
      </BarChart>
    </Card>
  );
};
