import RegistrationHero from "../components/registration/RegistrationHero";
import RegistrationForm from "../components/registration/.RegistrationForm";

import styles from './Registration.module.css';

function Registration() {
  return (
     <main className={styles.registrationPage}>

      <RegistrationHero />

      <RegistrationForm />

    </main>
  )
}

export default Registration






