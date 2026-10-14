import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutTeam from "@/components/about/AboutTeam";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutValues from "@/components/about/AboutValues";
import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";

const ABOUT_STATS = [
  { value: 5, suffix: "", label: "People on the team" },
  { value: 3, suffix: "", label: "Disciplines under one roof" },
  { value: 2, suffix: "", label: "Tiers — AI-Powered and Custom Premium" },
  { value: 4, suffix: "", label: "Sectors with dedicated service lines" },
];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Crudify is a five-person studio covering MERN development, digital marketing and cybersecurity — one team that builds, markets and secures, starting in Punjab.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Marquee />
      <Stats items={ABOUT_STATS} ariaLabel="Crudify by the numbers" />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <CTA />
    </>
  );
}
