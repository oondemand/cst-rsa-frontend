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

const listarComPaginacao = async ({ filters = { direcao, tipo, ...rest } }) => {
  const { data } = await api.get("/integracao/todos", {
    params: filters,
  });

  return data;
};

export const IntegracaoService = {
  listar,
  processar,
  listarComPaginacao,
};
