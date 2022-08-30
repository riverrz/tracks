import Head from "next/head";
import Image from "next/image";
import GradientLayout from "../components/layouts/gradient.layout";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <GradientLayout
      color="gray"
      subtitle="Profile"
      title="Shivam Kumar"
      description="10 public playlists"
      image="/me.png"
      roundImage
    >
      <div>Home page</div>
    </GradientLayout>
  );
};

export default Home;
