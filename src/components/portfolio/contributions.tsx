import {
  ContributionGraph,
  ContributionGraphGrid,
  ContributionGraphLegend,
  ContributionGraphTooltip,
  type ContributionData,
} from "@/components/ui/contribution-graph"
import github from "@/data/github.json"

/**
 * A GitHub-style contribution heatmap for the last year. Data is fetched at
 * build time into `src/data/github.json` (see scripts/fetch-github.mjs).
 */
export function Contributions() {
  const data = github.contributions as ContributionData[]

  return (
    <section
      aria-label="GitHub contributions"
      className="flex min-w-0 flex-col gap-3"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-foreground">Contributions</h2>
        <span className="text-xs text-muted-foreground">
          {github.total.toLocaleString()} in the last year
        </span>
      </div>

      <ContributionGraph
        data={data}
        startDate={github.startDate}
        endDate={github.endDate}
        cellSize={9}
      >
        <ContributionGraphGrid />
        <ContributionGraphTooltip />
        <ContributionGraphLegend className="mt-3" />
      </ContributionGraph>
    </section>
  )
}
