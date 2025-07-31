import { api } from "../config/api";

const listar = async ({ filters = { time, direcao, tipo } }) => {
  const { data } = await api.get("/integracao/", {
    params: filters,
  });

  return data;
};

const processar = async () => {
  const { data } = await api.post("/integracao/processar");
  return data;
};

export const IntegracaoService = {
  listar,
  processar,
};
