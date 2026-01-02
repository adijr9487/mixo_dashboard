import { Card, Col, Empty, Row, Statistic } from "antd";
import { useInsight } from "../api";
import { formatDateTime } from "../utils/helper";

export const Insight = ({ id }: { id: string }) => {
  const { data, isFetching } = useInsight(id || "");

  return (
    <Card
      size="small"
      title={`Specific Campaign Insights (${id})`}
      loading={isFetching}
    >
      {id ? (
        <Row gutter={5}>
          <Col span={8}>
            <Statistic title="Impressions" value={data?.insights.impressions} />
          </Col>
          <Col span={8}>
            <Statistic title="Clicks" value={data?.insights.clicks} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Conversion Rate"
              value={data?.insights.conversion_rate}
            />
          </Col>
          <Col span={8}>
            <Statistic title="Conversions" value={data?.insights.conversions} />
          </Col>
          <Col span={8}>
            <Statistic title="CPC" value={data?.insights.cpc} />
          </Col>
          <Col span={8}>
            <Statistic title="CTR" value={data?.insights.ctr} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Timestamps"
              value={formatDateTime(data?.insights.timestamp || "")}
            />
          </Col>
          <Col span={8}>
            <Statistic title="Spend" value={data?.insights.spend} />
          </Col>
        </Row>
      ) : (
        <Empty children={"Please select a Campaign from the list below"} />
      )}
    </Card>
  );
};
