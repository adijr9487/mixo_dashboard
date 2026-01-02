import { api } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { AggregateInsight, Campaign, CampaignsResponse, Insight } from "./types";

export const useCampaigns = () => {
    return useQuery({
        queryKey: ["campaigns"],
        queryFn: async (): Promise<CampaignsResponse> => (await api.get("/campaigns")).data,
      });
};

export const useCampaign = (id: String) => {
    return useQuery({
        queryKey: ["campaign", id],
        queryFn: async (): Promise<Campaign> => (await api.get(`/campaigns/${id}`)).data,
      });
};

export const useInsights = () => {
    return useQuery({
        queryKey: ["insights"],
        queryFn: async (): Promise<AggregateInsight> => (await api.get("/campaigns/insights")).data,
      });
};

export const useInsight = (id: String) => {
    return useQuery({
        queryKey: ["insight", id],
        queryFn: async (): Promise<Insight> => (await api.get(`/campaigns/${id}/insights`)).data,
      });
};
