import React, { useMemo } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DataGrid } from "../../components/dataGrid";
import { useDataGrid } from "../../hooks/useDataGrid";
import { makeMoedaDynamicColumns } from "./columns";
import { queryClient } from "../../config/react-query";
// import { MoedaDialog } from "./dialog";
import { MoedaService } from "../../service/moeda";
// import { useUpdateAssistantConfig } from "../../hooks/api/assistant-config/useUpdateAssistantConfig";
import { ORIGENS } from "../../constants/origens";
import { Container } from "../../components/container";
import { RefreshCcw } from "lucide-react";
import { TimeOutButton } from "../../components/timeOutButton";
import { Tooltip } from "../../components/ui/tooltip";

export const MoedaPage = () => {
  const columns = useMemo(() => makeMoedaDynamicColumns({}), []);
  const { filters, table } = useDataGrid({ columns, key: "MOEDA" });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["listar-moedas", { filters }],
    queryFn: async () => await MoedaService.listarMoedas({ filters }),
    placeholderData: keepPreviousData,
  });

  // const updateAssistantConfig = useUpdateAssistantConfig({
  //   origem: ORIGENS.DATAGRID,
  //   onSuccess: () => queryClient.refetchQueries(["listar-moedas", { filters }]),
  // });

  return (
    <Container>
      <Box>
        <Flex alignItems="center" gap="4">
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Moedas
          </Text>
          <Tooltip content="Atualizar cotação">
            <TimeOutButton
              onClick={async () => {
                await MoedaService.atualizarCotacao();
                queryClient.refetchQueries(["listar-moedas"]);
              }}
            >
              <RefreshCcw />
            </TimeOutButton>
          </Tooltip>
        </Flex>
        <Box mt="4" bg="white" py="6" px="4" rounded="lg" shadow="xs">
          <DataGrid
            table={table}
            // form={MoedaDialog}
            data={data?.results || []}
            rowCount={data?.pagination?.totalItems}
            isDataLoading={isLoading || isFetching}
            // onUpdateData={async (values) => {
            //   await updateAssistantConfig.mutateAsync({
            //     id: values.id,
            //     body: values.data,
            //   });
            // }}
          />
        </Box>
      </Box>
    </Container>
  );
};
