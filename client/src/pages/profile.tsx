import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import MainLayout from "./MainLayout";

const Profile: NextPageWithLayout = () => {
  return <p>Profile</p>;
};

Profile.getLayout = function getLayout(profile: ReactElement) {
  return <MainLayout>{profile}</MainLayout>;
};

export default Profile;
