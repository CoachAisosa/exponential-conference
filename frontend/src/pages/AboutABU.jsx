import ABUHero from "../components/about-abu/ABUHero";
import ABUPrograms from "../components/about-abu/ABUPrograms";
import ABUFaculties from "../components/about-abu/ABUFaculties";
import ABUFAQ from "../components/about-abu/ABUFAQ";
import ABUCTA from "../components/about-abu/ABUCTA";
import styles from "./AboutABU.module.css";

function AboutABU() {
  return (
    <main className={styles.aboutABUPage}>
      <ABUHero />
      <ABUPrograms />
      <ABUFaculties />
      <ABUFAQ />
      <ABUCTA />
    </main>
  );
}

export default AboutABU;