import { CampaignStatus } from "./types";

export const API_BASE_URL = "https://mixo-fe-backend-task.vercel.app"

export const STATUS_FILTERS: { text: string; value: CampaignStatus }[] = [
    { text: "Active", value: "active" },
    { text: "Paused", value: "paused" },
    { text: "Completed", value: "completed" },
  ];
