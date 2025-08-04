import { useMemo } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { IntegracaoService } from "../../../../../service/integracao";
import { DataGrid } from "../../../../../components/dataGrid";
import { makeDynamicIntegrationColumns } from "./columns";
import { useDataGrid } from "../../../../../hooks/useDataGrid";
import {
  INTEGRACAO_DIRECAO_MAP,
  INTEGRACAO_TIPO_MAP,
} from "../../../../../constants";

export const IntegracaoPessoaOmieCentralDatagrid = () => {
  const columns = useMemo(() => makeDynamicIntegrationColumns(), []);
  const { filters, table } = useDataGrid({
    columns,
    key: "INTEGRACAO_PESSOA_OMIE_CENTRAL",
  });

  const esteiraFilters = {
    direcao: INTEGRACAO_DIRECAO_MAP.OMIE_CENTRAL,
    tipo: INTEGRACAO_TIPO_MAP.PESSOA,
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "integracao-pessoa-omie-central-todos",
      { filters: { ...filters, ...esteiraFilters } },
    ],

    queryFn: async () =>
      await IntegracaoService.listarComPaginacao({
        filters: { ...filters, ...esteiraFilters },
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Flex
        flex="1"
        pt="8"
        px="6"
        pb="2"
        itens="center"
        overflow="auto"
        scrollbarWidth="thin"
        bg="#F8F9FA"
      >
        <Box>
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Integração Clientes / prestadores central {"<-"} omie
          </Text>
          <Box mt="4" bg="white" py="6" px="4" rounded="lg" shadow="xs">
            <DataGrid
              table={table}
              data={data?.results || []}
              rowCount={data?.pagination?.totalItems}
              isDataLoading={isLoading || isFetching}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};
