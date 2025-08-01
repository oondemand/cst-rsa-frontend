export const TIPO_PESSOA_OPTIONS = [
  { label: "Pessoa física", value: "pf" },
  { label: "Pessoa jurídica", value: "pj" },
  { label: "Exterior", value: "ext" },
];

export const STATUS_PESSOA_OPTIONS = [
  { label: "Ativo", value: "ativo" },
  { label: "Pendente de revisão", value: "pendente-de-revisao" },
  { label: "Inativo", value: "inativo" },
  { label: "Arquivado", value: "arquivado" },
];

export const REGIME_TRIBUTARIO_OPTIONS = [
  { label: "Simples nacional (mei)", value: "SIMPLES_NACIONAL_MEI" },
  { label: "Simples nacional", value: "SIMPLES_NACIONAL" },
  { label: "Simples nacional excesso", value: "SIMPLES_NACIONAL_EXCESSO" },
  { label: "Lucro presumido", value: "LUCRO_PRESUMIDO" },
  { label: "Lucro real", value: "LUCRO_REAL" },
  { label: "Lucro arbitrado", value: "LUCRO_ARBITRADO" },
  { label: "Imune/isento", value: "IMUNE_ISENTA" },
];

export const INTEGRACAO_PESSOA_CENTRAL_OMIE_ETAPAS = [
  { nome: "Requisicao", codigo: "requisicao" },
  { nome: "Reprocessar", codigo: "reprocessar" },
  { nome: "Processando", codigo: "processando" },
  { nome: "Erro", codigo: "erro" },
  { nome: "Sucesso", codigo: "sucesso" },
];

export const INTEGRACAO_DIRECAO_MAP = {
  CENTRAL_OMIE: "central_omie",
  OMIE_CENTRAL: "omie_central",
};

export const INTEGRACAO_TIPO_MAP = {
  PESSOA: "pessoa",
  CONTA_PAGAR: "conta_pagar",
};
