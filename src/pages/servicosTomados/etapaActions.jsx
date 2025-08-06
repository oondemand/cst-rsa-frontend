import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { SquarePlus } from "lucide-react";
import { TicketModal } from "../../components/servicoTomadoTicketModal";
import { Tooltip } from "../../components/ui/tooltip";
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import { InvertedChart } from "../../components/svg/invertedChart";

export const EtapaActions = ({ etapa }) => {
  const [createModalOpen, setCreateModalOpen] = useState();

  if (etapa.codigo === "requisicao") {
    return (
      <Box>
        <Tooltip content="Criar ticket">
          <Text
            p="1"
            rounded="full"
            _hover={{ bg: "gray.200" }}
            onClick={() => setCreateModalOpen(true)}
            color="brand.500"
            cursor="pointer"
          >
            <SquarePlus size={20} />
          </Text>
        </Tooltip>
        {createModalOpen && (
          <TicketModal open={createModalOpen} setOpen={setCreateModalOpen} />
        )}
      </Box>
    );
  }

  // if (etapa.codigo === "geracao-rpa") {
  //   return (
  //     <Tooltip content="Integração RPA">
  //       <Link to="/integracao-rpa" viewTransition>
  //         <Text
  //           p="1"
  //           rounded="full"
  //           _hover={{ bg: "gray.200" }}
  //           color="brand.500"
  //           cursor="pointer"
  //         >
  //           <ArrowUpDown size={20} />
  //         </Text>
  //       </Link>
  //     </Tooltip>
  //   );
  // }

  if (etapa.codigo === "conta-pagar-central-omie") {
    return (
      <Tooltip content="Conta pagar central -> omie">
        <Link to="/integracao/conta-pagar/central-omie" viewTransition>
          <Text p="1" rounded="full" color="brand.500" cursor="pointer">
            <InvertedChart />
          </Text>
        </Link>
      </Tooltip>
    );
  }

  if (etapa.codigo === "conta-pagar-omie-central") {
    return (
      <Tooltip content="Conta pagar central <- omie">
        <Link to="/integracao/conta-pagar/omie-central" viewTransition>
          <Text p="1" rounded="full" color="brand.500" cursor="pointer">
            <InvertedChart />
          </Text>
        </Link>
      </Tooltip>
    );
  }
};
