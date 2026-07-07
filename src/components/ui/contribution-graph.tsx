"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Constants
// ============================================================================

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MS_IN_DAY = 86_400_000;

const CONTRIBUTION_CELL_SIZE = 10;
const CONTRIBUTION_CELL_RADIUS = 2;
const CONTRIBUTION_GAP = 2;

const CONTRIBUTION_COLOR_EMPTY = "var(--contribution-empty)";
const CONTRIBUTION_COLOR_LEVEL_1 = "var(--contribution-level-1)";
const CONTRIBUTION_COLOR_LEVEL_2 = "var(--contribution-level-2)";
const CONTRIBUTION_COLOR_LEVEL_3 = "var(--contribution-level-3)";
const CONTRIBUTION_COLOR_LEVEL_4 = "var(--contribution-level-4)";

// ============================================================================
// Types
// ============================================================================

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionData = {
  date: string; // YYYY-MM-DD format
  count: number;
  level?: ContributionLevel;
};

type TooltipState = {
  x: number;
  y: number;
  date: string;
  count: number;
} | null;

type HeatmapCell = {
  date: string;
  count: number;
  level: ContributionLevel;
  withinRange: boolean;
};

type MonthHeader = {
  label: string;
  weeks: number;
  offset: number;
};

// ============================================================================
// Context
// ============================================================================

type ContributionGraphContextValue = {
  data: Map<string, ContributionData>;
  weeksMatrix: HeatmapCell[][];
  monthHeaders: MonthHeader[];
  totalWeeks: number;
  cellSize: number;
  cellRadius: number;
  gap: number;
  colors: {
    empty: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
  };
  tooltip: TooltipState;
  setTooltip: React.Dispatch<React.SetStateAction<TooltipState>>;
  formatDate: (date: string) => string;
  formatCount: (count: number) => string;
};

const ContributionGraphContext =
  React.createContext<ContributionGraphContextValue | null>(null);

function useContributionGraph() {
  const context = React.useContext(ContributionGraphContext);
  if (!context) {
    throw new Error(
      "useContributionGraph must be used within a ContributionGraph",
    );
  }
  return context;
}

// ============================================================================
// Utilities
// ============================================================================

function normalizeDate(dateInput: string | Date): Date {
  const date =
    dateInput instanceof Date ? new Date(dateInput) : new Date(dateInput);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function alignToWeekStart(date: Date): Date {
  const clone = new Date(date);
  clone.setUTCDate(clone.getUTCDate() - clone.getUTCDay());
  return clone;
}

function alignToWeekEnd(date: Date): Date {
  const clone = new Date(date);
  clone.setUTCDate(clone.getUTCDate() + (6 - clone.getUTCDay()));
  return clone;
}

function formatDateKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateLevel(count: number, max: number): ContributionLevel {
  if (count === 0) return 0;
  if (max === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function buildGrid(
  data: ContributionData[],
  startDate: string,
  endDate: string,
): { matrix: HeatmapCell[][]; headers: MonthHeader[]; weeks: number } {
  const contributionsMap = new Map<string, ContributionData>(
    data.map((entry) => [entry.date, entry]),
  );

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const rangeStart = normalizeDate(startDate);
  const rangeEnd = normalizeDate(endDate);
  const gridStart = alignToWeekStart(rangeStart);
  const gridEnd = alignToWeekEnd(rangeEnd);

  const totalDays =
    Math.floor((gridEnd.getTime() - gridStart.getTime()) / MS_IN_DAY) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);

  const matrix: HeatmapCell[][] = [];
  for (let w = 0; w < totalWeeks; w++) {
    const week: HeatmapCell[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + d;
      const current = new Date(gridStart.getTime() + dayOffset * MS_IN_DAY);
      const key = formatDateKey(current);
      const withinRange = current >= rangeStart && current <= rangeEnd;
      const entry = contributionsMap.get(key);
      const count = withinRange ? entry?.count ?? 0 : 0;
      const level = withinRange
        ? entry?.level ?? calculateLevel(count, maxCount)
        : 0;

      week.push({
        date: key,
        count,
        level: Math.max(0, Math.min(4, level)) as ContributionLevel,
        withinRange,
      });
    }
    matrix.push(week);
  }

  const headers: MonthHeader[] = [];
  let currentMonth = -1;
  let currentOffset = 0;

  for (let w = 0; w < totalWeeks; w++) {
    const weekStart = new Date(gridStart.getTime() + w * 7 * MS_IN_DAY);
    const month = weekStart.getUTCMonth();

    if (month !== currentMonth) {
      if (currentMonth !== -1) {
        headers[headers.length - 1].weeks = w - currentOffset;
      }
      headers.push({ label: MONTH_LABELS[month], weeks: 0, offset: w });
      currentMonth = month;
      currentOffset = w;
    }
  }
  if (headers.length > 0) {
    headers[headers.length - 1].weeks = totalWeeks - currentOffset;
  }

  return { matrix, headers, weeks: totalWeeks };
}

// ============================================================================
// Components
// ============================================================================

interface ContributionGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ContributionData[];
  startDate: string;
  endDate: string;
  cellSize?: number;
  cellRadius?: number;
  gap?: number;
  colorEmpty?: string;
  colorLevel1?: string;
  colorLevel2?: string;
  colorLevel3?: string;
  colorLevel4?: string;
  formatDate?: (date: string) => string;
  formatCount?: (count: number) => string;
  children?: React.ReactNode;
}

function ContributionGraph({
  data,
  startDate,
  endDate,
  cellSize = CONTRIBUTION_CELL_SIZE,
  cellRadius = CONTRIBUTION_CELL_RADIUS,
  gap = CONTRIBUTION_GAP,
  colorEmpty = CONTRIBUTION_COLOR_EMPTY,
  colorLevel1 = CONTRIBUTION_COLOR_LEVEL_1,
  colorLevel2 = CONTRIBUTION_COLOR_LEVEL_2,
  colorLevel3 = CONTRIBUTION_COLOR_LEVEL_3,
  colorLevel4 = CONTRIBUTION_COLOR_LEVEL_4,
  formatDate: userFormatDate,
  formatCount: userFormatCount,
  className,
  children,
  ...props
}: ContributionGraphProps) {
  const [tooltip, setTooltip] = React.useState<TooltipState>(null);

  const { matrix, headers, weeks } = React.useMemo(
    () => buildGrid(data, startDate, endDate),
    [data, startDate, endDate],
  );

  const dataMap = React.useMemo(
    () => new Map(data.map((d) => [d.date, d])),
    [data],
  );

  const formatDate = React.useCallback(
    (date: string) => {
      if (userFormatDate) return userFormatDate(date);
      return new Date(date).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    },
    [userFormatDate],
  );

  const formatCount = React.useCallback(
    (count: number) => {
      if (userFormatCount) return userFormatCount(count);
      return `${count} contribution${count === 1 ? "" : "s"}`;
    },
    [userFormatCount],
  );

  const colors = React.useMemo(
    () => ({
      empty: colorEmpty,
      level1: colorLevel1,
      level2: colorLevel2,
      level3: colorLevel3,
      level4: colorLevel4,
    }),
    [colorEmpty, colorLevel1, colorLevel2, colorLevel3, colorLevel4],
  );

  const contextValue = React.useMemo(
    () => ({
      data: dataMap,
      weeksMatrix: matrix,
      monthHeaders: headers,
      totalWeeks: weeks,
      cellSize,
      cellRadius,
      gap,
      colors,
      tooltip,
      setTooltip,
      formatDate,
      formatCount,
    }),
    [
      dataMap,
      matrix,
      headers,
      weeks,
      cellSize,
      cellRadius,
      gap,
      colors,
      tooltip,
      formatDate,
      formatCount,
    ],
  );

  return (
    <ContributionGraphContext.Provider value={contextValue}>
      <div
        className={cn("relative select-none", className)}
        style={
          {
            "--contribution-cell-size": `${cellSize}px`,
            "--contribution-cell-radius": `${cellRadius}px`,
            "--contribution-gap": `${gap}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </ContributionGraphContext.Provider>
  );
}

interface ContributionGraphGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showDayLabels?: boolean;
  showMonthLabels?: boolean;
}

function ContributionGraphGrid({
  showDayLabels = true,
  showMonthLabels = true,
  className,
  ...props
}: ContributionGraphGridProps) {
  const {
    weeksMatrix,
    monthHeaders,
    totalWeeks,
    cellSize,
    cellRadius,
    gap,
    colors,
    setTooltip,
  } = useContributionGraph();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const date = target.dataset.date;
      const count = target.dataset.count;

      if (date && count !== undefined) {
        const rect = target.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          setTooltip({
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top,
            date,
            count: parseInt(count, 10),
          });
        }
      }
    },
    [setTooltip],
  );

  const handleMouseLeave = React.useCallback(() => {
    setTooltip(null);
  }, [setTooltip]);

  const levelColors = [
    colors.empty,
    colors.level1,
    colors.level2,
    colors.level3,
    colors.level4,
  ];

  return (
    <div
      ref={containerRef}
      className={cn("overflow-x-auto", className)}
      {...props}
    >
      <div style={{ minWidth: `${totalWeeks * (cellSize + gap) + 24}px` }}>
        {showMonthLabels && (
          <div
            className="grid mb-1 text-[10px] text-muted-foreground"
            style={{
              paddingLeft: showDayLabels ? "20px" : "0",
              gap: `${gap}px`,
              gridTemplateColumns: monthHeaders
                .map((h) => `repeat(${h.weeks}, 1fr)`)
                .join(" "),
            }}
          >
            {monthHeaders.map((header, i) => (
              <div
                key={`${header.label}-${i}`}
                className="truncate"
                style={{ gridColumn: `span ${header.weeks}` }}
              >
                {header.weeks >= 2 ? header.label : ""}
              </div>
            ))}
          </div>
        )}

        <div className="flex" style={{ gap: `${gap}px` }}>
          {showDayLabels && (
            <div
              className="flex flex-col justify-around shrink-0 text-[9px] text-muted-foreground"
              style={{ width: "16px" }}
            >
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="h-0 leading-none">
                  {i % 2 === 1 ? label : ""}
                </span>
              ))}
            </div>
          )}

          <div
            className="grid flex-1"
            style={{
              gap: `${gap}px`,
              gridAutoFlow: "column",
              gridTemplateColumns: `repeat(${totalWeeks}, minmax(var(--contribution-cell-size), 1fr))`,
              gridTemplateRows: `repeat(7, minmax(var(--contribution-cell-size), 1fr))`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {weeksMatrix.map((week, weekIndex) =>
              week.map((cell, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  data-date={cell.withinRange ? cell.date : undefined}
                  data-count={cell.withinRange ? cell.count : undefined}
                  className={cn(
                    "aspect-square transition-shadow",
                    cell.withinRange &&
                      "cursor-pointer hover:ring-2 hover:ring-ring",
                  )}
                  style={{
                    backgroundColor: cell.withinRange
                      ? levelColors[cell.level]
                      : "transparent",
                    borderRadius: `${cellRadius}px`,
                  }}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContributionGraphTooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: (data: { date: string; count: number }) => React.ReactNode;
}

function ContributionGraphTooltip({
  children,
  className,
  ...props
}: ContributionGraphTooltipProps) {
  const { tooltip, formatDate, formatCount } = useContributionGraph();

  if (!tooltip) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 rounded-lg border bg-popover px-2.5 py-1.5 text-xs shadow-md",
        className,
      )}
      style={{
        left: tooltip.x,
        top: tooltip.y - 8,
        transform: "translate(-50%, -100%)",
      }}
      {...props}
    >
      {children ? (
        children({ date: tooltip.date, count: tooltip.count })
      ) : (
        <div className="whitespace-nowrap">
          <div className="font-medium text-popover-foreground">
            {formatCount(tooltip.count)}
          </div>
          <div className="text-muted-foreground">{formatDate(tooltip.date)}</div>
        </div>
      )}
    </div>
  );
}

interface ContributionGraphLegendProps
  extends React.HTMLAttributes<HTMLDivElement> {
  lessLabel?: string;
  moreLabel?: string;
}

function ContributionGraphLegend({
  lessLabel = "Less",
  moreLabel = "More",
  className,
  ...props
}: ContributionGraphLegendProps) {
  const { colors, cellRadius } = useContributionGraph();

  const levelColors = [
    colors.empty,
    colors.level1,
    colors.level2,
    colors.level3,
    colors.level4,
  ];

  return (
    <div
      className={cn(
        "flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span>{lessLabel}</span>
      {levelColors.map((color, i) => (
        <div
          key={i}
          className="size-2.5 sm:size-3"
          style={{
            backgroundColor: color,
            borderRadius: `${cellRadius}px`,
          }}
        />
      ))}
      <span>{moreLabel}</span>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export {
  ContributionGraph,
  ContributionGraphGrid,
  ContributionGraphTooltip,
  ContributionGraphLegend,
};
