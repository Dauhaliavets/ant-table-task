import { FC, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, InputNumber } from "antd";
import { observer } from "mobx-react-lite";
import { tableStore } from "../../stores/TableStore";
import { CreateRecordDTO } from "../../types";
import dayjs from "dayjs";

export const EditModal: FC = observer(() => {
  const [form] = Form.useForm();
  const { editingRecord, isModalVisible, hideModal, updateRecord, addRecord } =
    tableStore;

  useEffect(() => {
    if (isModalVisible) {
      if (editingRecord) {
        form.setFieldsValue({
          ...editingRecord,
          date: dayjs(editingRecord.date),
        });
      } else {
        form.resetFields();
      }
    }
  }, [editingRecord, isModalVisible, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        date: values.date.toISOString(),
      };

      if (editingRecord) {
        updateRecord(editingRecord.id, formattedValues);
      } else {
        addRecord(formattedValues as CreateRecordDTO);
      }
      hideModal();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={editingRecord ? "Edit Record" : "Create Record"}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={() => hideModal()}
      okText={editingRecord ? "Update" : "Create"}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: "active", value: 0 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="value"
          label="Numeric Value"
          rules={[{ required: true, message: "Please input a numeric value!" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter value" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
