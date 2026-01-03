import { useEffect, useState } from "react";
import { Insight } from "../api/types";
import { API_BASE_URL } from "../api/constant";

export const useInsightStream = (id: string) => {
  const [data, setData] = useState<Insight['insights'] | null>(null);

  useEffect(() => {
    if (!id) return;

    const source = new EventSource(
      `${API_BASE_URL}/campaigns/${id}/insights/stream`
    );

    source.onmessage = (event) => {
      const parsed: Insight['insights'] = JSON.parse(event.data);
      setData(parsed);
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, [id]);

  return data;
};
