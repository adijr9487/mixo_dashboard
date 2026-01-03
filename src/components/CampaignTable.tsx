import { useMemo, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";

import { Campaign, CampaignStatus } from "../api/types";
import { useCampaigns } from "../api";

import { getColumnSearchProps } from "../utils/tableSearch";

const STATUS_FILTERS: { text: string; value: CampaignStatus }[] = [
  { text: "Active", value: "active" },
  { text: "Paused", value: "paused" },
  { text: "Completed", value: "completed" },
];

export const CampaignTable = ({
  setSelectedInsight,
}: {
  setSelectedInsight: (id: string) => void;
}) => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
  });

  const { data, isFetching } = useCampaigns();

  const columns: TableColumnsType<Campaign> = useMemo(
    () => [
      {
        title: "Sr. no",
        render: (_, _r, index) =>
          (pagination.page - 1) * pagination.perPage + index + 1,
      },
      {
        title: "Name",
        dataIndex: "name",
        ...getColumnSearchProps<Campaign>("name"),
      },
      {
        title: "Brand Id",
        dataIndex: "brand_id",
      },
      {
        title: "Status",
        dataIndex: "status",
        filters: STATUS_FILTERS,
        onFilter: (value, record) => record.status === value,
      },
      {
        title: "Budget",
        dataIndex: "budget",
        sorter: (a, b) => a.budget - b.budget,
      },
      {
        title: "Daily Budget",
        dataIndex: "daily_budget",
        sorter: (a, b) => a.daily_budget - b.daily_budget,
      },
      {
        title: "Platforms",
        dataIndex: "platforms",
      },
      {
        title: "Action",
        render: (_, r) => (
          <Button
            type="link"
            onClick={() => setSelectedInsight(r.id)}
            icon={<EyeOutlined />}
          />
        ),
      },
    ],
    [pagination, setSelectedInsight]
  );

  return (
    <Table
      columns={columns}
      dataSource={data?.campaigns}
      loading={isFetching}
      pagination={{
        current: pagination.page,
        pageSize: pagination.perPage,
        onChange: (page, pageSize) =>
          setPagination({ page, perPage: pageSize }),
        total: data?.total,
      }}
      rowKey="id"
    />
  );
};
