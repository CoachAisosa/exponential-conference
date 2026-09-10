import AccommodationHero from "../components/accommodation/AccommodationHero";
import VenueSection from "../components/accommodation/VenueSection";
import GettingToBenin from "../components/accommodation/GettingToBenin";
import AccommodationOptions from "../components/accommodation/AccommodationOptions";
import ChoosingAccommodation from "../components/accommodation/ChoosingAccommodation";
import InternationalDelegates from "../components/accommodation/InternationalDelegates";
import TravelPreparation from "../components/accommodation/TravelPreparation";
import VenueAddress from "../components/accommodation/VenueAddress";
import TravelHelp from "../components/accommodation/TravelHelp";
import WelcomeBenin from "../components/accommodation/WelcomeBenin";
import styles from "./Accommodation.module.css";

function Accommodation() {
  return (
    <main className={styles.accommodationPage}>
      <AccommodationHero />
      <VenueSection />
      <GettingToBenin />
      <AccommodationOptions />
      <ChoosingAccommodation />
      <InternationalDelegates />
      <TravelPreparation />
      <VenueAddress />
      <TravelHelp />
      <WelcomeBenin />
    </main>
  );
}

export default Accommodation;