/** Geometric learning worksheet only. This module does not determine planning entitlement. */
export type PlotPlanningInput = {
  frontageFt: number;
  depthFt: number;
  illustrativeCountedAreaPerLevel: number;
  levels: number;
};
export type PlotPlanningResult = {
  plotAreaSqft: number;
  exampleCountedAreaSqft: number;
  illustrativeRatio: number;
  exampleLevelCount: number;
  areaExceedsPlot: boolean;
};

const valid = (value: number, min: number, max: number) => Number.isFinite(value) && value >= min && value <= max;

/** FSI *concept* = assumed FSI-counted area / geometric plot area; not the legally permitted FSI. */
export function calculatePlotPlanning(input: PlotPlanningInput): PlotPlanningResult | null {
  const { frontageFt, depthFt, illustrativeCountedAreaPerLevel: perLevel, levels } = input;
  if (!valid(frontageFt, 5, 1000) || !valid(depthFt, 5, 1000) || !valid(perLevel, 1, 1000000) || !Number.isInteger(levels) || levels < 1 || levels > 4) return null;
  const plotAreaSqft = Math.round(frontageFt * depthFt * 100) / 100;
  const exampleCountedAreaSqft = Math.round(perLevel * levels * 100) / 100;
  return {
    plotAreaSqft,
    exampleCountedAreaSqft,
    illustrativeRatio: Math.round(exampleCountedAreaSqft / plotAreaSqft * 100) / 100,
    exampleLevelCount: levels,
    areaExceedsPlot: perLevel > plotAreaSqft,
  };
}

export function plotPlanningBrief(input: PlotPlanningInput, result: PlotPlanningResult, locality: string): string {
  const format = (value: number) => value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  return [
    'Site planning worksheet — illustrative only',
    locality.trim() ? 'General locality: ' + locality.trim() : 'General locality: to be confirmed',
    `Plot dimensions: ${format(input.frontageFt)} × ${format(input.depthFt)} ft`,
    `Geometric rectangular plot area: ${format(result.plotAreaSqft)} sq.ft (verify survey)`,
    `Example levels: ${result.exampleLevelCount} (ground + ${result.exampleLevelCount - 1})`,
    `Assumed FSI-counted area per level: ${format(input.illustrativeCountedAreaPerLevel)} sq.ft`,
    `Example counted floor area across levels: ${format(result.exampleCountedAreaSqft)} sq.ft`,
    `Illustrative area ratio: ${result.illustrativeRatio.toFixed(2)} (NOT permitted FSI)`,
    result.areaExceedsPlot ? 'Review assumed area: per-level figure is larger than the geometric plot area.' : '',
    'Please verify the actual survey area, counted/excluded floor areas, land use, road width, jurisdiction, setbacks, height, current rules and approval route with a registered professional.',
    'This worksheet is not a planning permission, FSI entitlement, technical drawing or construction estimate.',
  ].filter(Boolean).join('\n');
}
