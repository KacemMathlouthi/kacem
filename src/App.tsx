import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Intersection2 from "@/components/pixel-perfect/intersection2"
import { Bio } from "@/components/portfolio/bio"
import { Contributions } from "@/components/portfolio/contributions"
import { Hero } from "@/components/portfolio/hero"
import { SocialLinks } from "@/components/portfolio/social-links"

export function App() {
  return (
    <main className="w-full">
      <Intersection2>
        <div className="reveal flex flex-col gap-5 px-6 py-10 sm:px-8">
          <Hero />
          <Bio />
          <Contributions />
          <SocialLinks />
        </div>
      </Intersection2>
      <SpeedInsights />
      <Analytics />
    </main>
  )
}

export default App
