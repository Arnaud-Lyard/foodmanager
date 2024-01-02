import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import MainLayout from "./MainLayout";

const About: NextPageWithLayout = () => {
  return <p>Welcome</p>;
};

About.getLayout = function getLayout(about: ReactElement) {
  return <MainLayout>{about}</MainLayout>;
};

export default About;
