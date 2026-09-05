import Hero from "../components/home/Hero";
import WelcomeSection from "../components/home/WelcomeSection";
import WhyMultiplier from "../components/home/WhyMultiplier";
import TimothyModel from "../components/home/TimothyModel";
import WhatToExpect from "../components/home/WhatToExpect";
import WhoShouldAttend from "../components/home/WhoShouldAttend";
import ConferenceExperience from "../components/home/ConferenceExperience";
import AboutABU from "../components/home/AboutABU";
import ConferenceDetails from "../components/home/ConferenceDetails";
import FinalCTA from "../components/home/FinalCTA";
import styles from './Home.module.css'


function Home() {
  return (
    <>
    <main className={styles.homePage}>
        <Hero />

      <WelcomeSection />

      <WhyMultiplier />

      <TimothyModel />

      <WhatToExpect />

      <WhoShouldAttend />

      <ConferenceExperience />

      <AboutABU />

      <ConferenceDetails />
      
      <FinalCTA />
    </main>
    </>
  )
}

export default Home
