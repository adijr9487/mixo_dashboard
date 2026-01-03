import { Card, Col, Row, Statistic } from "antd";

import { formatDateTime } from "../utils/helper";
import { AggregateInsight } from "../api/types";

export const AggregateInsights = ({
  data,
  isFetching,
}: {
  data: AggregateInsight | undefined;
  isFetching: boolean;
}) => {
  return (
    <Card
      size="small"
      title="Aggregated Campaign Insights"
      loading={isFetching}
    >
      <Row gutter={5}>
        <Col span={8}>
          <Statistic
            title="Active Campaigns"
            value={data?.insights.active_campaigns}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Avg Conversion Rate"
            value={data?.insights.avg_conversion_rate}
          />
        </Col>
        <Col span={8}>
          <Statistic title="Avg CPC" value={data?.insights.avg_cpc} />
        </Col>
        <Col span={8}>
          <Statistic title="Avg CTR" value={data?.insights.avg_ctr} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Completed Campaigns"
            value={data?.insights.completed_campaigns}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Paused Campaigns"
            value={data?.insights.paused_campaigns}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Timestamps"
            value={formatDateTime(data?.insights.timestamp || "")}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Campaigns"
            value={data?.insights.total_campaigns}
          />
        </Col>
        <Col span={8}>
          <Statistic title="Total Clicks" value={data?.insights.total_clicks} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Conversions"
            value={data?.insights.total_conversions}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Impressions"
            value={data?.insights.total_impressions}
          />
        </Col>
        <Col span={8}>
          <Statistic title="Total Spend" value={data?.insights.total_spend} />
        </Col>
      </Row>
    </Card>
  );
};
