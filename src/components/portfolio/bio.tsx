import { brands } from "@/lib/brands"

import { Brand } from "./brand"
import { Highlight } from "./highlight"

/** The narrative bio, one paragraph per chapter of experience. */
export function Bio() {
  return (
    <div className="flex flex-col gap-5 text-[1.0625rem] leading-[1.7rem] text-muted-foreground">
      <p>
        I&apos;m a <Highlight>software engineer</Highlight> at{" "}
        <Brand {...brands.callab}>Callab&nbsp;AI (YC&nbsp;P26)</Brand>, which I
        joined before we got into{" "}
        <Brand {...brands.yc}>Y&nbsp;Combinator</Brand> as a team, and where I
        build an <Highlight>AI voice agents platform</Highlight> for{" "}
        <Highlight>on-prem telephony</Highlight>, made to work with existing
        PBX, SBC, and contact center infrastructure out of the box without any
        migration.
      </p>

      <p>
        Before that, I spent the summer as a{" "}
        <Brand {...brands.gsoc}>Google Summer of Code&nbsp;&apos;25</Brand>{" "}
        fellow at <Brand {...brands.nrnb}>NRNB</Brand>, where I built{" "}
        <Highlight>VCell-AI</Highlight>, an AI agent platform that lets{" "}
        <Highlight>computational biology researchers</Highlight> query, explore,
        and generate <Highlight>biomodels</Highlight> in natural language.
      </p>

      <p>
        Earlier, I was a{" "}
        <Highlight>machine learning engineering intern</Highlight> at{" "}
        <Brand {...brands.orange}>Orange</Brand>, designing an{" "}
        <Highlight>edge-optimized CNN</Highlight> for plant disease
        classification and an{" "}
        <Highlight>agentic report generation pipeline</Highlight>.
      </p>

      <p>
        I also served as <Highlight>Technical Manager</Highlight> for{" "}
        <Brand {...brands.ains} big>
          AINS 3.0
        </Brand>
        , the AI National Summit by <Brand {...brands.ieee}>IEEE CS</Brand>{" "}
        INSAT, where I led a <Highlight>three-track hackathon</Highlight>, a{" "}
        <Highlight>data science competition</Highlight>, and{" "}
        <Highlight>four workshops</Highlight>.
      </p>

      <p>
        Outside of work, I build things I wish existed. Right now I&apos;m
        building <Brand {...brands.animus}>Animus</Brand>, a platform that
        produces narrated, research-grounded{" "}
        <Highlight>Manim explainer videos</Highlight> for any topic. Before that
        I built <Brand {...brands.metis}>Metis</Brand>, an AI platform for
        GitHub pull requests with a <Highlight>cloud coding agent</Highlight>{" "}
        for <Highlight>autonomous code review</Highlight>,{" "}
        <Highlight>background issue resolution</Highlight>, and{" "}
        <Highlight>automatic PR title and summary generation</Highlight>.
      </p>

      <p>
        On the research side, I have a paper under review at{" "}
        <Highlight>TMLR</Highlight>,{" "}
        <span className="font-medium text-foreground italic">
          &ldquo;Revisiting Generalization Measures Beyond IID: How Image
          Corruption and Perturbation Affect Robustness of Generalization
          Measures&rdquo;
        </span>
        , which revisits whether <Highlight>generalization measures</Highlight>{" "}
        that look reliable under <Highlight>IID evaluation</Highlight> still
        hold up when image classifiers face controlled{" "}
        <Highlight>corruptions and perturbations</Highlight>.
      </p>

      <p>
        I&apos;m currently a <Highlight>software engineering student</Highlight>{" "}
        at{" "}
        <Brand {...brands.insat} big>
          INSAT
        </Brand>{" "}
        in Tunis, graduating in 2027, and I like building things that put AI to
        practical use.
      </p>
    </div>
  )
}
