import { useState } from "react";
import { Card, Col, Empty, Row, Statistic, Switch } from "antd";

import { Insight } from "../api/types";

import { formatDateTime } from "../utils/helper";
import { useInsightStream } from "../utils/hooks";

export const Insights = ({
  data,
  isLoading,
}: {
  data: Insight | undefined;
  isLoading: boolean | undefined;
}) => {
  const [viaSocketId, setViaSocketId] = useState("");

  const insightStream = useInsightStream(viaSocketId);

  const insights = viaSocketId ? insightStream : data?.insights;

  return (
    <Card
      size="small"
      title={`Specific Campaign Insights (${insights?.campaign_id})`}
      extra={
        <Switch
          checkedChildren="SSE"
          unCheckedChildren="REST"
          defaultChecked={!!viaSocketId}
          onClick={(e) => {
            setViaSocketId(e ? data?.insights.campaign_id || "" : "");
          }}
        />
      }
      loading={isLoading}
    >
      {data ? (
        <Row gutter={5}>
          <Col span={8}>
            <Statistic title="Impressions" value={insights?.impressions} />
          </Col>
          <Col span={8}>
            <Statistic title="Clicks" value={insights?.clicks} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Conversion Rate"
              value={insights?.conversion_rate}
            />
          </Col>
          <Col span={8}>
            <Statistic title="Conversions" value={insights?.conversions} />
          </Col>
          <Col span={8}>
            <Statistic title="CPC" value={insights?.cpc} />
          </Col>
          <Col span={8}>
            <Statistic title="CTR" value={insights?.ctr} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Timestamps"
              value={formatDateTime(insights?.timestamp || "")}
            />
          </Col>
          <Col span={8}>
            <Statistic title="Spend" value={insights?.spend} />
          </Col>
        </Row>
      ) : (
        <Empty children={"Please select a Campaign from the list below"} />
      )}
    </Card>
  );
};
