import { Col, Row } from "antd";
import { AggregateInsights } from "./AggregateInsights";
import { Insight } from "./Insight";
import { useState } from "react";
import CampaignTable from "./CampaignTable";

export const Dashboard = () => {
  const [selectedInsight, setSelectedInsight] = useState("");

  return (
    <Row gutter={[12, 12]}>
      <Col className="gutter-row" span={12}>
        <AggregateInsights />
      </Col>
      <Col className="gutter-row" span={12}>
        <Insight id={selectedInsight} />
      </Col>
      <Col className="gutter-row" span={24}>
        <CampaignTable setSelectedInsight={setSelectedInsight} />
      </Col>
      <Col className="gutter-row" span={24}>
        <CampaignTable setSelectedInsight={setSelectedInsight} />
      </Col>
    </Row>
  );
};
