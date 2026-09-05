import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import ContactSocials from "../components/contact/ContactSocials";
import ContactCTA from "../components/contact/ContactCTA";

import styles from "./Contact.module.css";

function Contact() {
  return (
      <main className={styles.contactPage}>

      <ContactHero />

      <ContactForm />

      <ContactMap />

      <ContactSocials />

      <ContactCTA />
    
     </main >
  )
}

export default Contact
