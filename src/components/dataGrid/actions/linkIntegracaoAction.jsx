import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { InvertedChart } from "../../svg/invertedChart";

export const LinkIntegracaoAction = ({ integracaoUrl }) => {
  return (
    <Link to={`/integracao${integracaoUrl}`} viewTransition>
      <IconButton
        variant="surface"
        colorPalette="gray"
        size="2xs"
        color="brand.500"
      >
        <InvertedChart />
      </IconButton>
    </Link>
  );
};
