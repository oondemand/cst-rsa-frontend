import React, { useMemo } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DocumentosFiscaisService } from "../../service/documentos-fiscais";
import { DataGrid } from "../../components/dataGrid";
import { makeDynamicColumns } from "./columns";
import { queryClient } from "../../config/react-query";
import { DocumentosFiscaisDialog } from "./dialog";
import { useNavigate } from "react-router-dom";
import { useDataGrid } from "../../hooks/useDataGrid";
import { useUpdateDocumentoFiscal } from "../../hooks/api/documento-fiscal/useUpdateDocumentoFiscal";
import { ORIGENS } from "../../constants/origens";

export const DocumentosFiscais = () => {
  const navigate = useNavigate();
  const columns = useMemo(() => makeDynamicColumns(), []);
  const { filters, table } = useDataGrid({
    columns,
    key: "DOCUMENTOS_FISCAIS",
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["listar-pessoas", { filters }],
    queryFn: async () =>
      await DocumentosFiscaisService.listarDocumentosFiscais({ filters }),
    placeholderData: keepPreviousData,
  });

  const updateDocumentoFiscal = useUpdateDocumentoFiscal({
    origem: ORIGENS.DATAGRID,
    onSuccess: () => {
      queryClient.refetchQueries(["listar-documentos-fiscais", { filters }]);
    },
  });

  const getAllDocumentosFiscaisWithFilters = async (pageSize) => {
    const response = await DocumentosFiscaisService.exportarDocumentosFiscais({
      filters: {
        ...filters,
        pageSize: pageSize ? pageSize : data?.pagination?.totalItems,
        pageIndex: 0,
      },
    });

    return response.data.buffer;
  };

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
            Documentos fiscais
          </Text>
          <Box mt="4" bg="white" py="6" px="4" rounded="lg" shadow="xs">
            <DataGrid
              form={DocumentosFiscaisDialog}
              exportDataFn={getAllDocumentosFiscaisWithFilters}
              importDataFn={() => navigate("/documentos-fiscais/importacao")}
              table={table}
              data={data?.results || []}
              rowCount={data?.pagination?.totalItems}
              isDataLoading={isLoading || isFetching}
              onUpdateData={async (values) => {
                await updateDocumentoFiscal.mutateAsync({
                  id: values.id,
                  body: values.data,
                });
              }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};
