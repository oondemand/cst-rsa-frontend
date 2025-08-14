import { Box, Flex, Heading, Text, Checkbox } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IntegracaoService } from "../../../service/integracao";
import { queryClient } from "../../../config/react-query";

function formatarTipo(tipo) {
  if (!tipo) return "";
  const texto = tipo.replace(/_/g, " ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const IntegracoesConfigPage = () => {
  const { data } = useQuery({
    queryKey: ["integracao-config"],
    queryFn: IntegracaoService.listarConfig,
    staleTime: 1000 * 60 * 1, // 1min
  });

  const configsAgrupadas = data?.configs?.reduce((acc, item) => {
    let grupo = acc.find((g) => g.tipo === item.tipo);
    if (!grupo) {
      grupo = { tipo: item.tipo, integracoes: [] };
      acc.push(grupo);
    }

    grupo.integracoes.push(item);
    return acc;
  }, []);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ body, id }) =>
      await IntegracaoService.atualizarConfig({
        body,
        id,
      }),
  });

  const handleCheckChange = async ({ integracao }) => {
    await mutateAsync({
      body: { ativa: !integracao.ativa },
      id: integracao?._id,
    });

    queryClient.invalidateQueries(["integracao-config"]);
    return;
  };

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Heading>Integrações</Heading>
      <Flex gap="4" mt="8">
        {configsAgrupadas?.length > 0 &&
          configsAgrupadas?.map((item) => (
            <Box px="4" py="2" bg="white" shadow="xs" rounded="lg">
              <Text fontWeight="semibold" color="gray.700">
                {formatarTipo(item.tipo)}
              </Text>
              <Box mt="4">
                {item?.integracoes.length > 0 &&
                  item?.integracoes.map((integracao) => {
                    return (
                      <Flex alignItems="center" gap="2" mt="1">
                        <Checkbox.Root
                          colorPalette={integracao?.ativa ? "green" : "gray"}
                          variant="subtle"
                          checked={integracao?.ativa}
                          onChange={() => handleCheckChange({ integracao })}
                          disabled={isPending}
                          cursor="pointer"
                          _disabled={{ cursor: "not-allowed" }}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                        </Checkbox.Root>
                        <Text fontWeight="light">
                          {integracao.tipo}/{integracao.direcao}
                        </Text>
                      </Flex>
                    );
                  })}
              </Box>
            </Box>
          ))}
      </Flex>
    </Flex>
  );
};
