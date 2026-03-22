import { FC } from "react";
import { Layout, Typography } from "antd";
import styles from "./header.module.scss";

const { Title } = Typography;

export const Header: FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Title level={3} className={styles.title}>
        CRUD Table App
      </Title>
    </Layout.Header>
  );
};
