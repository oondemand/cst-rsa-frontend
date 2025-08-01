import { Flex, Heading, Text, Box } from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTitle,
} from "../../../../components/ui/dialog";

import { Oondemand } from "../../../../components/svg/oondemand";

import "react-json-view-lite/dist/index.css";
import React from "react";
import { useLoadAssistant } from "../../../../hooks/api/assistant-config/useLoadAssistant";
import { useIaChat } from "../../../../hooks/useIaChat";

export const TicketDetailsDialog = ({
  children,
  open,
  setOpen,
  ticket,
  actions,
}) => {
  const { onOpen } = useIaChat();

  const { assistant } = useLoadAssistant(
    `integracao.${ticket?.direcao}.${ticket?.etapa}`
  );

  return (
    <DialogRoot
      size="cover"
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <DialogContent
        overflow="hidden"
        w="1000px"
        h="95%"
        pt="6"
        px="2"
        rounded="lg"
      >
        <DialogTitle
          asChild
          borderBottom="1px solid"
          w="full"
          borderColor="gray.200"
        >
          <Flex gap="4" alignItems="center" mt="-4" py="2" px="4">
            <Box
              aria-label="Abrir IA"
              cursor="pointer"
              variant="unstyled"
              onClick={() => onOpen(ticket, assistant)}
            >
              <Oondemand />
            </Box>
            <Flex gap="4" alignItems="baseline">
              <Heading fontSize="sm">Detalhes</Heading>
              <Text fontSize="xs" fontWeight="normal" fontStyle="italic">
                {ticket?.parentId}
              </Text>
            </Flex>
          </Flex>
        </DialogTitle>
        <DialogBody
          pb="16"
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          overflowY="auto"
          className="dialog-custom-scrollbar"
        >
          <Flex mt="7" w="full" gap="4" justifyContent="space-between">
            <Text fontSize="md">{ticket?.titulo}</Text>
          </Flex>
          {children && React.cloneElement(children, { ticket })}
        </DialogBody>
        <DialogFooter justifyContent="start">
          {React.createElement(actions, {
            id: ticket?._id,
            etapa: ticket.etapa,
          })}
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
