import { brands } from "@/lib/brands"

import { Brand } from "./brand"
import { Highlight } from "./highlight"

/** The narrative bio, one paragraph per chapter of experience. */
export function Bio() {
  return (
    <div className="flex flex-col gap-4 text-[0.98rem] leading-[1.58rem] text-muted-foreground">
      <p>
        I&apos;m a <Highlight>software engineer</Highlight> at{" "}
        <Brand {...brands.callab}>Callab&nbsp;AI (YC&nbsp;P26)</Brand>. I joined
        before{" "}
        <Brand {...brands.yc}>Y&nbsp;Combinator</Brand> and went through the
        batch with the team, and I build an{" "}
        <Highlight>AI voice agents platform</Highlight> for on-prem telephony
        that works with existing PBX, SBC, and contact center infrastructure,
        no migration needed.
      </p>

      <p>
        Before that, I spent the summer as a{" "}
        <Brand {...brands.gsoc}>Google Summer of Code&nbsp;&apos;25</Brand>{" "}
        fellow at <Brand {...brands.nrnb}>NRNB</Brand>, where I built{" "}
        <Highlight>VCell-AI</Highlight>, an AI agent platform that lets
        computational biology researchers query, explore, and generate
        biomodels in natural language.
      </p>

      <p>
        Earlier, I was a{" "}
        <Highlight>machine learning engineering intern</Highlight> at{" "}
        <Brand {...brands.orange}>Orange</Brand>, building an{" "}
        <Highlight>edge-optimized CNN</Highlight> for plant disease
        classification and an agentic report generation pipeline.
      </p>

      <p>
        Outside of work, I build things I wish existed. Right now I&apos;m
        building <Brand {...brands.animus}>Animus</Brand>, a platform that turns
        any topic into narrated, research-grounded{" "}
        <Highlight>Manim explainer videos</Highlight>. Before that I built{" "}
        <Brand {...brands.metis}>Metis</Brand>, an AI platform for GitHub pull
        requests with a <Highlight>cloud coding agent</Highlight> for autonomous
        code review, issue resolution, and PR summaries.
      </p>

      <p>
        On the research side, I have a paper accepted at{" "}
        <Highlight>TMLR</Highlight>, titled{" "}
        <Brand {...brands.openreview} className="whitespace-normal italic">
          &ldquo;Generalization Measures under Controlled Covariate Shift: A
          Regime-Aware Benchmark&rdquo;
        </Brand>
        , which asks whether generalization measures that look reliable under
        IID evaluation still hold up when image classifiers face corruptions and
        perturbations, and finds that their usefulness is strongly
        regime-dependent.
      </p>

      <p>
        I&apos;m currently a <Highlight>software engineering student</Highlight>{" "}
        at{" "}
        <Brand {...brands.insat} big>
          INSAT
        </Brand>{" "}
        in Tunis, graduating in 2027, where I also served as{" "}
        <Highlight>Technical Manager</Highlight> for{" "}
        <Brand {...brands.ains} big>
          AINS 3.0
        </Brand>
        , the AI National Summit by{" "}
        <Brand {...brands.ieee}>IEEE CS INSAT</Brand>, leading a three-track
        hackathon, a data science competition, and four workshops. I like
        building things that put AI to practical use.
      </p>
    </div>
  )
}
