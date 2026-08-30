// Writes the last year of GitHub contributions to src/data/github.json at
// build time. On failure it keeps the committed snapshot and exits 0.
import { writeFileSync, existsSync } from "fs"
import { mkdirSync } from "fs"

const USERNAME = "KacemMathlouthi"
const API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
const OUT = "src/data/github.json"

try {
  const res = await fetch(API)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const contributions = json.contributions ?? []
  if (contributions.length === 0) throw new Error("empty contributions")

  const data = {
    total:
      json.total?.lastYear ?? contributions.reduce((a, c) => a + c.count, 0),
    startDate: contributions[0].date,
    endDate: contributions[contributions.length - 1].date,
    contributions,
  }

  mkdirSync("src/data", { recursive: true })
  writeFileSync(OUT, JSON.stringify(data) + "\n")
  console.log(
    `[fetch-github] wrote ${OUT}: ${data.total} contributions, ` +
      `${data.startDate} -> ${data.endDate}`
  )
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err)
  if (existsSync(OUT)) {
    console.warn(
      `[fetch-github] fetch failed (${msg}); keeping existing ${OUT}`
    )
  } else {
    console.error(`[fetch-github] fetch failed (${msg}) and no snapshot exists`)
  }
  // Never fail the build over this.
}
