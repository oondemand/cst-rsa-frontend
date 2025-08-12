import { api } from "../config/api";

const listarMoedas = async ({ filters }) => {
  const { data } = await api.get("/moedas", { params: filters });
  return data;
};

const listarAtivas = async () => {
  const { data } = await api.get("/moedas/ativas");
  return data;
};

const atualizarCotacao = async () => {
  return await api.post("/moedas/atualizar-cotacao");
};

export const MoedaService = {
  listarMoedas,
  listarAtivas,
  atualizarCotacao,
};
