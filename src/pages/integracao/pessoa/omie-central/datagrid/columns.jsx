import { Box, Flex, Text } from "@chakra-ui/react";
import { DefaultCell } from "../../../../../components/dataGrid/cells/default";
import { TableActionsCell } from "../../../../../components/dataGrid/cells/tableActionsCell";
import { VisualizarDetailsDialog } from "./detailsCell";
import { INTEGRACAO_OMIE_ETAPAS_PADRAO } from "../../../../../constants";

export const makeDynamicIntegrationColumns = () => {
  const etapas = INTEGRACAO_OMIE_ETAPAS_PADRAO.map((e) => ({
    label: e.nome,
    value: e.codigo,
  }));

  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      cell: (props) => {
        return (
          <TableActionsCell>
            <VisualizarDetailsDialog {...props} />
          </TableActionsCell>
        );
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "etapa",
      header: "Etapa",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        filterKey: "etapa",
        filterVariant: "select",
        filterOptions: etapas,
      },
    },
    {
      accessorKey: "titulo",
      header: "Titulo",
      cell: DefaultCell,
      enableSorting: false,
      meta: { filterKey: "titulo" },
    },
    {
      accessorKey: "parentId",
      header: "Id prestador",
      cell: DefaultCell,
      enableSorting: false,
      meta: { filterKey: "parentId" },
    },
    {
      accessorKey: "tentativas",
      header: "Tentativas",
      cell: DefaultCell,
      enableSorting: false,
      meta: { filterKey: "tentativas" },
    },
    {
      accessorKey: "erros",
      header: "Errors",
      cell: (props) => (
        <Box minH="8" fontSize="sm" alignContent="center" px="1">
          {props.getValue()?.length ?? 0}
        </Box>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      meta: { filterKey: "erros" },
    },
    {
      accessorKey: "arquivado",
      header: "Arquivado",
      cell: (props) => (
        <Box minH="8" fontSize="sm" alignContent="center" px="1">
          {props.getValue() && "Arquivado"}
        </Box>
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "arquivado",
        filterVariant: "select",
        filterOptions: [{ label: "Arquivados", value: "true" }],
      },
    },
    {
      accessorKey: "motivoArquivamento",
      header: "Motivo",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        filterKey: "motivoArquivamento",
        filterVariant: "select",
        filterOptions: [
          { label: "Duplicidade", value: "duplicidade" },
          {
            label: "Arquivado pelo usuario",
            value: "arquivado pelo usuario",
          },
        ],
      },
    },
  ];
};
