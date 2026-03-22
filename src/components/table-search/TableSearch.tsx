import { FC } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { tableStore } from "../../stores/TableStore";

export const TableSearch: FC = observer(() => {
  return (
    <Input
      allowClear
      placeholder="Search across all cells..."
      prefix={<SearchOutlined />}
      value={tableStore.searchQuery}
      onChange={(e) => tableStore.setSearchQuery(e.target.value)}
    />
  );
});
