import type { ReactElement } from "react";
import DashboardLayout from "./DashboardLayout";
import type { NextPageWithLayout } from "../_app";

const About: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

About.getLayout = function getLayout(about: ReactElement) {
  return <DashboardLayout>{about}</DashboardLayout>;
};

export default About;
