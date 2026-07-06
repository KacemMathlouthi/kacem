import Intersection2 from "@/components/pixel-perfect/intersection2"
import { Bio } from "@/components/portfolio/bio"
import { Hero } from "@/components/portfolio/hero"
import { SocialLinks } from "@/components/portfolio/social-links"

export function App() {
  return (
    <main className="w-full">
      <Intersection2>
        <div className="flex flex-col gap-6 px-6 py-12 sm:px-8">
          <Hero />
          <Bio />
          <SocialLinks />
        </div>
      </Intersection2>
    </main>
  )
}

export default App
