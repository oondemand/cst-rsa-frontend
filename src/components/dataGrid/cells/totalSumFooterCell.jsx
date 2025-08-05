import { Flex, Text } from "@chakra-ui/react";
import { currency } from "../../../utils/currency";
import { Tooltip } from "../../../components/ui/tooltip";

export const TotalSumFooterCell = ({ sum }) => {
  return (
    <Flex minH="8">
      <Tooltip
        content="Valor referente ao total da coluna"
        openDelay={500}
        closeDelay={50}
      >
        <Text alignSelf="center" fontSize="sm" truncate>
          {currency.format(sum)}
        </Text>
      </Tooltip>
    </Flex>
  );
};
