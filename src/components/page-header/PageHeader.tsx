import { FC, ReactNode } from "react";
import { Typography } from "antd";
import styles from "./page-header.module.scss";

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
  extra?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, extra }) => {
  return (
    <div className={styles.wrapper}>
      <Title level={4} className={styles.title}>
        {title}
      </Title>
      {extra && <div>{extra}</div>}
    </div>
  );
};
