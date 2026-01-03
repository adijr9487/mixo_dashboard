import { AggregateInsight, Insight } from "../api/types";

export const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  const two = (v: number) => v.toString().padStart(2, "0");

  const day = two(date.getDate());
  const month = two(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = two(date.getHours());
  const minutes = two(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};


interface PlotData {
  label: string;
  value: number;
  name: string;
}

const COMMON_INSIGHT_KEYS = [
  "ctr",
  "cpc",
  "conversion_rate",
] as const;


export const mapInsightToPlotData = (
  insight: Insight
): PlotData[] => {
  return COMMON_INSIGHT_KEYS.map((key) => ({
    label: key,
    name: insight.insights['campaign_id'],
    value: insight.insights[key],
  }));
};


export const mapAggregateInsightToPlotData = (
  aggregate: AggregateInsight
): PlotData[] => {
  return COMMON_INSIGHT_KEYS.map((key) => ({
    label: key,
    name: 'aggregate',
    value: aggregate.insights[`avg_${key}` as keyof AggregateInsight['insights']] as number,
  }));
};
