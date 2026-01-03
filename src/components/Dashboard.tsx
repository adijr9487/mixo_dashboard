import { useState } from "react";
import { Col, Row } from "antd";

import { useAggregateInsights, useInsight } from "../api";
import { Insights } from "./Insight";

import { Plot } from "./Plot";
import { AggregateInsights } from "./AggregateInsights";
import { CampaignTable } from "./CampaignTable";

export const Dashboard = () => {
  const [selectedInsight, setSelectedInsight] = useState("");

  const { data: aggregate, isFetching: aggregateLoading } =
    useAggregateInsights();
  const { data: insights, isLoading: insightLoading } =
    useInsight(selectedInsight);

  return (
    <Row gutter={[12, 12]}>
      <Col className="gutter-row" span={12}>
        <AggregateInsights
          data={aggregate?.insights}
          isFetching={aggregateLoading}
        />
      </Col>

      <Col className="gutter-row" span={12}>
        <Plot
          aggregateInsightData={aggregate?.insights}
          specificInsightData={insights?.insights}
          isLoading={aggregateLoading}
        />
      </Col>

      <Col className="gutter-row" span={18}>
        <CampaignTable setSelectedInsight={setSelectedInsight} />
      </Col>

      <Col className="gutter-row" span={6}>
        <Insights data={insights?.insights} isLoading={insightLoading} />
      </Col>
    </Row>
  );
};
