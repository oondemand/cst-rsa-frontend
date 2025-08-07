import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../styles/swiper.css";

import { Flex, Spinner, Heading, Button } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Etapa } from "../../../../components/etapaCard";
import { IntegracaoService } from "../../../../service/integracao";
import { Filter, RefreshCcw, Table } from "lucide-react";
import { DebouncedInput } from "../../../../components/DebouncedInput";
import { useStateWithStorage } from "../../../../hooks/useStateStorage";
import { SelectTime } from "../../../../components/selectTime";
import {
  INTEGRACAO_DIRECAO_MAP,
  INTEGRACAO_OMIE_ETAPAS_CONTA_PAGAR,
  INTEGRACAO_TIPO_MAP,
} from "../../../../constants";
import { Card } from "../../components/card";
import { TimeOutButton } from "../../../../components/timeOutButton";
import { Tooltip } from "../../../../components/ui/tooltip";
import { Link } from "react-router-dom";
import { TicketDetailsDialog } from "../../components/dialog";
import { TicketActions } from "../../components/dialog/actions";
import { queryClient } from "../../../../config/react-query";
import { TicketBody } from "./dialogBody";
import { Actions } from "./actions";

export const IntegracaoContaPagarCentralOmieEsteira = () => {
  const [searchTerm, setSearchTerm] = useStateWithStorage(
    "esteira_integracao_conta_pagar_central_omie_search_term"
  );

  const [time, setTime] = useStateWithStorage(
    "esteira_integracao_conta_pagar_central_omie_time",
    1
  );

  const filters = {
    direcao: INTEGRACAO_DIRECAO_MAP.CENTRAL_OMIE,
    tipo: INTEGRACAO_TIPO_MAP.CONTA_PAGAR,
    time: time,
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["integracao-conta-pagar-central-omie-listar", { filters }],
    queryFn: async () => await IntegracaoService.listar({ filters }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1, // 1 minuto
    refetchInterval: 1000 * 10, // 10 sec
  });

  const filteredTickets =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? data?.results?.filter((ticket) => {
          const term = searchTerm?.toLowerCase()?.trim();
          return (
            ticket?.titulo?.toLowerCase()?.includes(term) ||
            ticket?.payload?.conta_pagar?.documento
              ?.toLowerCase()
              ?.includes(term.replace(/[^a-zA-Z0-9]/g, "")) ||
            ticket?.parentId === term
          );
        })
      : data?.results;

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Flex pb="4" justifyContent="space-between">
        <Flex alignItems="center" gap="2">
          <Heading color="gray.700" fontSize="2xl">
            Integração conta pagar central {"->"} omie
          </Heading>

          <Tooltip content="Sincronizar com omie">
            <TimeOutButton onClick={() => IntegracaoService.processar()}>
              <RefreshCcw />
            </TimeOutButton>
          </Tooltip>

          <Tooltip content="Visualizar todos em tabela">
            <Link to="/integracao/conta-pagar/central-omie/todos">
              <Button
                color="purple.700"
                bg="purple.200"
                p="1.5"
                rounded="2xl"
                cursor="pointer"
                size="sm"
              >
                <Table />
              </Button>
            </Link>
          </Tooltip>

          {(isLoading || isFetching) && <Spinner size="md" />}
        </Flex>
        <Flex alignItems="center" color="gray.400" gap="3">
          <Filter size={24} />

          <SelectTime
            value={[time]}
            onValueChange={(value) => {
              queryClient.invalidateQueries([
                "integracao-conta-pagar-central-omie-listar",
              ]);
              setTime(Number(value[0]));
            }}
          />

          <DebouncedInput
            size="xs"
            w="sm"
            bg="white"
            placeholder="Pesquisar..."
            rounded="sm"
            _placeholder={{ color: "gray.400" }}
            placeIcon="right"
            iconSize={16}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </Flex>
      </Flex>
      <Flex flex="1" pb="2" itens="center" overflow="hidden">
        {!isLoading &&
          filteredTickets &&
          INTEGRACAO_OMIE_ETAPAS_CONTA_PAGAR && (
            <Swiper
              style={{
                height: "100%",
                width: "100%",
              }}
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={true}
              modules={[FreeMode, Navigation]}
              navigation={true}
            >
              {INTEGRACAO_OMIE_ETAPAS_CONTA_PAGAR?.map((etapa) => (
                <SwiperSlide
                  key={etapa._id}
                  style={{ minWidth: "250px", maxWidth: "250px" }}
                >
                  <Etapa
                    etapa={etapa}
                    tickets={filteredTickets}
                    action={Actions}
                    {...(["anexos"].includes(etapa.codigo) && {
                      containerStyles: {
                        bg: "#dcdfe2",
                      },
                    })}
                    card={(props) => (
                      <Card ticket={props.ticket}>
                        <TicketDetailsDialog
                          tipoDeIntegracao="conta_pagar"
                          actions={TicketActions}
                        >
                          <TicketBody />
                        </TicketDetailsDialog>
                      </Card>
                    )}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      </Flex>
    </Flex>
  );
};
