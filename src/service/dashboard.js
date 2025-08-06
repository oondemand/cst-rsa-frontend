import { api } from "../config/api";

const estatisticas = async () => {
  const { data } = await api.get("/dashboard/estatisticas");
  return data;
};

export const DashboardService = {
  estatisticas,
};
