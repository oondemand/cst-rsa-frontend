import { Box, IconButton } from "@chakra-ui/react";
import { Eye } from "lucide-react";
import { TicketDetailsDialog } from "../../../components/dialog";
import { TicketBody } from "../dialogBody";
import { Tooltip } from "../../../../../components/ui/tooltip";
import { useState } from "react";
import { TicketActions } from "../../../components/dialog/actions";
import { ORIGENS } from "../../../../../constants/origens";

export const VisualizarDetailsDialog = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Tooltip content="Visualizar detalhes">
        <IconButton
          onClick={() => setOpen(true)}
          variant="surface"
          colorPalette="gray"
          size="2xs"
        >
          <Eye />
        </IconButton>
      </Tooltip>
      {open && (
        <TicketDetailsDialog
          tipoDeIntegracao="conta_pagar"
          open={open}
          setOpen={setOpen}
          ticket={props.row.original}
          actions={(props) => (
            <TicketActions {...props} origem={ORIGENS.DATAGRID} />
          )}
        >
          <TicketBody />
        </TicketDetailsDialog>
      )}
    </Box>
  );
};
