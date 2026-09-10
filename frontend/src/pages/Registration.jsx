import RegistrationHero from "../components/registration/RegistrationHero";
import RegistrationForm from "../components/registration/.RegistrationForm";

import styles from './Registration.module.css';
import HowToRegister from "../components/registration/HowToRegister";
import BringYourLeaders from "../components/registration/BringYourLeaders";
import ImportantInfo from "../components/registration/ImportantInfo";
import WhyRegisterEarly from "../components/registration/WhyRegisterEarly";

function Registration() {
  return (
     <main className={styles.registrationPage}>

      <RegistrationHero />

       <HowToRegister />

      <RegistrationForm />

      <WhyRegisterEarly />

      <ImportantInfo />

      <BringYourLeaders />

    </main>
  )
}

export default Registration






