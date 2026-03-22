import { FC } from "react";
import { Table, Button, Space, Popconfirm, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { observer } from "mobx-react-lite";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { IRecord } from "../../types";
import { tableStore } from "../../stores/TableStore";
import { TableSearch } from "../table-search/TableSearch";

export const DataTable: FC = observer(() => {
  const columns: ColumnsType<IRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: IRecord, b: IRecord) => a.name.localeCompare(b.name),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a: IRecord, b: IRecord) =>
        dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: (a: IRecord, b: IRecord) => a.value - b.value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => tableStore.showModal(record)}
            aria-label="Edit record"
          />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => tableStore.deleteRecord(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              aria-label="Delete record"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="middle">
      <TableSearch />
      <Table
        columns={columns}
        dataSource={[...tableStore.filteredRecords]}
        rowKey="id"
        loading={tableStore.isLoading}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </Space>
  );
});
