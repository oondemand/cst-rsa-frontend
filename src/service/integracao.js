import { api } from "../config/api";

const listar = async ({ filters = { time, direcao, tipo } }) => {
  const { data } = await api.get("/integracao/", {
    params: filters,
  });

  return data;
};

const listarConfig = async () => {
  const { data } = await api.get("/integracao/config");

  return data;
};

const atualizarConfig = async ({ id, body }) => {
  const { data } = await api.put(`/integracao/config/${id}`, body);

  return data;
};

const processar = async ({ tipo, direcao }) => {
  const { data } = await api.post("/integracao/processar", { tipo, direcao });
  return data;
};

const reprocessar = async ({ id }) => {
  const { data } = await api.post(`/integracao/reprocessar/${id}`);
  return data;
};

const arquivar = async ({ id }) => {
  const { data } = await api.post(`/integracao/arquivar/${id}`);
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
  arquivar,
  processar,
  reprocessar,
  listarConfig,
  atualizarConfig,
  listarComPaginacao,
};
