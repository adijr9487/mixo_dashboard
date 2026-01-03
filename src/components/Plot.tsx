import { Card, Col, Row } from "antd";

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

const COMMON_AVG_METRICS = ["ctr", "cpc", "conversion_rate"] as const;
const COMMON_AGG_METRICS = ["clicks", "impressions", "spend"] as const;

const mapAvgInsightsToRechartData = (
  aggregate: AggregateInsight["insights"] | undefined,
  insight: Insight["insights"] | undefined
) => {
  return COMMON_AVG_METRICS.map((key) => ({
    name: key.replace(/_/g, " ").toUpperCase(),
    average:
      aggregate &&
      (aggregate[`avg_${key}` as keyof AggregateInsight["insights"]] as number),
    insight: insight && insight[key],
  }));
};

const mapAggInsightsToRechartData = (
  aggregate: AggregateInsight["insights"] | undefined,
  insight: Insight["insights"] | undefined
) => {
  return COMMON_AGG_METRICS.map((key) => ({
    name: key.replace(/_/g, " ").toUpperCase(),
    aggregate:
      aggregate &&
      (aggregate[
        `total_${key}` as keyof AggregateInsight["insights"]
      ] as number),
    insight: insight && insight[key],
  }));
};

export const Plot = ({
  aggregateInsightData,
  specificInsightData,
  isLoading,
}: {
  aggregateInsightData: AggregateInsight["insights"] | undefined;
  specificInsightData: Insight["insights"] | undefined;
  isLoading: boolean | undefined;
}) => {
  const dataAvg = mapAvgInsightsToRechartData(
    aggregateInsightData,
    specificInsightData
  );

  const dataAgg = mapAggInsightsToRechartData(
    aggregateInsightData,
    specificInsightData
  );

  return (
    <Card size="small" title="Plot" loading={isLoading}>
      <Row gutter={[12, 12]}>
        <Col className="gutter-row" span={12}>
          <BarChart
            title="Comparision"
            style={{
              maxHeight: 254,
              aspectRatio: 1.618,
            }}
            responsive
            data={dataAvg}
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
              yAxisId="average"
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
            <Bar yAxisId="average" dataKey="average" fill="#8884d8" />
            <Bar yAxisId="insight" dataKey="insight" fill="#82ca9d" />
          </BarChart>
        </Col>
        <Col className="gutter-row" span={12}>
          <BarChart
            title="Weightage"
            style={{
              maxHeight: 254,
              aspectRatio: 1.618,
            }}
            responsive
            data={dataAgg}
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
        </Col>
      </Row>
    </Card>
  );
};
