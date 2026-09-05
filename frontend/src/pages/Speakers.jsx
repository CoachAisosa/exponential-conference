import SpeakerBenefits from "../components/speakers/SpeakerBenefits"
import SpeakerExperience from "../components/speakers/SpeakerExperience"
import SpeakerList from "../components/speakers/SpeakerList"
import SpeakersCTA from "../components/speakers/SpeakersCTA"
import SpeakersHero from "../components/speakers/SpeakersHero"


function Speakers() {
  return (
   <>
     <SpeakersHero/>

     <SpeakerList/>

     <SpeakerBenefits/>

     <SpeakerExperience/>

     <SpeakersCTA/>
   </>
  )
}

export default Speakers
