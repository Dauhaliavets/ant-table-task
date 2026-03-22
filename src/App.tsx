import { FC, useEffect } from "react";
import { Layout, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { tableStore } from "./stores/TableStore";
import { DataTable } from "./components/data-table/DataTable";
import { EditModal } from "./components/edit-modal/EditModal";
import { PageHeader } from "./components/page-header/PageHeader";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";

import styles from "./App.module.scss";

const { Content } = Layout;

export const App: FC = observer(() => {
  useEffect(() => {
    tableStore.fetchRecords();
  }, []);

  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <Space orientation="vertical" size="large">
          <PageHeader
            title="Records Management"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => tableStore.showModal()}
              >
                Create Record
              </Button>
            }
          />
          <DataTable />
        </Space>
      </Content>
      <Footer />
      <EditModal />
    </Layout>
  );
});
