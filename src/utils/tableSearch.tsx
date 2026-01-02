// utils/getColumnSearchProps.tsx
import type { ColumnType } from "antd/es/table";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";

export const getColumnSearchProps = <T,>(
  dataIndex: keyof T
): ColumnType<T> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: FilterDropdownProps) => (
    <Input
      placeholder={`Search ${String(dataIndex)}`}
      value={selectedKeys[0] as string}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => confirm()}
      allowClear
      size="small"
    />
  ),

  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  ),

  onFilter: (value, record) =>
    String(record[dataIndex])
      .toLowerCase()
      .includes(String(value).toLowerCase()),
});
