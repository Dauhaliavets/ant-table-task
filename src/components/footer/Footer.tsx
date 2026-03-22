import { FC } from "react";
import { Layout } from "antd";
import styles from "./footer.module.scss";

export const Footer: FC = () => {
  return (
    <Layout.Footer className={styles.footer}>
      CRUD Table App ©{new Date().getFullYear()} Created with Ant Design & MobX
    </Layout.Footer>
  );
};
