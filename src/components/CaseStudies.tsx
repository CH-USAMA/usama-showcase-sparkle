import SectionHeader from "@/components/system/SectionHeader";
import Reveal from "@/components/system/Reveal";
import CTA from "@/components/system/CTA";
import WorkCard from "@/components/WorkCard";
import { fromCaseStudy } from "@/lib/content/workItems";
import { useProjects } from "@/lib/content/projects";

/**
 * SELECTED WORK: the section the page is built to deliver a reader to.
 * Which projects appear here, and in what order, is the `featured` rank set
 * in /admin.
 */
const CaseStudies = () => {
  const { featured } = useProjects();
  return (
    <section id="work" className="fx-glow-top relative scroll-mt-24 py-24 lg:py-32">
      <div className="container mx-auto">
        <SectionHeader
          align="center"
          eyebrow="Selected work"
          title={
            <>
              Websites, apps &amp; systems I&apos;ve <em>shipped.</em>
            </>
          }
          lead="Live products and production systems. Open one for the challenge, the build and the outcome."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {featured.map((c, i) => (
            <Reveal key={c.id} index={Math.min(i, 3)}>
              <WorkCard item={fromCaseStudy(c)} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <CTA to="/projects" tone="ghost" arrow>
              View all work
            </CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CaseStudies;
