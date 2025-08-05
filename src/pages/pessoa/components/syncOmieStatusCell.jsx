import { Flex } from "@chakra-ui/react";
import { Tooltip } from "../../../components/ui/tooltip";

export const SyncOmieStatusCell = (props) => {
  const status = props.row.original?.status_sincronizacao_omie;

  const OMIE_SYNC_STATUS_MAP = {
    sucesso: { color: "green.400" },
    pendente: { color: "yellow.400" },
    erro: { color: "red.400" },
  };

  return (
    <Tooltip
      content={`Status sincronização com omie "${status}"`}
      positioning={{ placement: "top" }}
    >
      <Flex
        h="12px"
        w="12px"
        bg={OMIE_SYNC_STATUS_MAP[status]?.color}
        rounded="full"
        alignItems="center"
        justifyContent="center"
        shadow="xs"
        cursor="pointer"
      />
    </Tooltip>
  );
};
