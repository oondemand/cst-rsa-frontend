import { Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { InvertedChart } from "../../../../components/svg/invertedChart";
import { Tooltip } from "../../../../components/ui/tooltip";

export const Actions = ({ etapa }) => {
  if (etapa.codigo === "anexos") {
    return (
      <Tooltip content="Esteira Anexos -> omie">
        <Link to="/integracao/anexos/central-omie" viewTransition>
          <Text
            p="1"
            rounded="full"
            _hover={{ bg: "gray.200" }}
            color="brand.500"
            cursor="pointer"
          >
            <InvertedChart />
          </Text>
        </Link>
      </Tooltip>
    );
  }
};
