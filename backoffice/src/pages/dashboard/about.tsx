import type { ReactElement } from "react";
import DashboardLayout from "./DashboardLayout";
import type { NextPageWithLayout } from "../_app";

const About: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

About.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default About;
