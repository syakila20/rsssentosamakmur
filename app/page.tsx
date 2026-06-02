import Appointment from "@/Component/AppoitmentBanner";
import ArticleSection from "@/Component/Section/Article/Article";
import DoctorSection from "@/Component/Section/Doctor/Doctor";
import HeroSection from "@/Component/Section/Hero/Hero";
import OurClientsSection from "@/Component/Section/OurClient/OurClient";
import Service from "@/Component/Section/Service/Service";
import TrustIndicator from "@/Component/Section/TrustIndicator/Trustindicator";
import { websiteJsonLd } from "@/lib/seo/builder/website";

export default function Page() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="
          absolute -top-10 -right-10
          w-72 h-72
          bg-pink-300
          rounded-full
          filter blur-3xl
          opacity-20
          mix-blend-multiply
          animate-blob
          blob
        "
        />

        <div
          aria-hidden="true"
          className="
          absolute -bottom-10 -left-10
          w-72 h-72
          bg-teal-300
          rounded-full
          filter blur-3xl
          opacity-20
          mix-blend-multiply
          animate-blob
          animation-delay-2000
          blob
        "
        />

        <HeroSection />

        <div className="bg-linear-to-br from-fuchsia-50 to-teal-50 overflow-hidden h-auto relative">
          <div
            aria-hidden="true"
            className="absolute top-50 -right-100.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"
          />

          <TrustIndicator />

          <Service />

          <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40" />
          <DoctorSection />
          <ArticleSection />

          <OurClientsSection />

          <Appointment />
        </div>
      </div>
    </>
  );
}
