import { Box, Flex, Text, Heading, IconButton } from "@chakra-ui/react";
import {
  DialogBody,
  DialogRoot,
  DialogContent,
  DialogTitle,
  DialogCloseTrigger,
  DialogTrigger,
} from "../../ui/dialog";

import { Oondemand } from "../../svg/oondemand";
import { CircleHelp } from "lucide-react";
import { Tooltip } from "../../ui/tooltip";
import { collapseAllNested, JsonView } from "react-json-view-lite";

import "react-json-view-lite/dist/index.css";

const customTheme = {};

export const MoedaRequisicaoDetailsCell = ({ moeda }) => {
  if (moeda.sigla === "BRL") return;

  return (
    <DialogRoot size="cover">
      <Tooltip content="Detalhes da requisição">
        <DialogTrigger>
          <IconButton size="2xs" variant="surface">
            <CircleHelp />
          </IconButton>
        </DialogTrigger>
      </Tooltip>

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
            {/* <Box
              aria-label="Abrir IA"
              cursor="pointer"
              variant="unstyled"
              onClick={() => onOpen(ticket, assistant)}
            > */}
            <Oondemand />
            {/* </Box> */}
            <Flex gap="4" alignItems="baseline">
              <Heading fontSize="sm">Detalhes da requisição</Heading>
              <Text fontSize="xs" fontWeight="normal" fontStyle="italic">
                {moeda?._id}
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
          <Text color="gray.600" fontSize="md" mt="6">
            Detalhes da requisicao
          </Text>
          <Box bg="gray.50" p="4" rounded="sm" mb="4" mt="8">
            <Text fontSize="sm" color="gray.600" mb="2.5">
              Url:
            </Text>
            <Box p="2.5" bg="white" rounded="sm" fontWeight="medium" mb="4">
              {moeda?.requisicao?.url || "N/A"}
            </Box>

            <Text fontSize="sm" color="gray.600" mb="2.5">
              Body:
            </Text>
            <Box p="2.5" bg="white" rounded="sm" fontWeight="normal">
              {moeda?.requisicao?.body && (
                <JsonView
                  container={{ backgroundColor: "red" }}
                  data={moeda?.requisicao?.body}
                  shouldExpandNode={collapseAllNested}
                  style={customTheme}
                />
              )}
              {!moeda?.requisicao?.body && <Text>N/A</Text>}
            </Box>
          </Box>

          <Box bg="gray.50" p="4" rounded="md" mt="8">
            <Text fontSize="sm" mt="2" color="gray.600" mb="2">
              Resposta:
            </Text>
            <Box p="2" bg="white" rounded="md" fontWeight="normal">
              {moeda?.resposta && (
                <JsonView
                  container={{ backgroundColor: "red" }}
                  data={moeda?.resposta}
                  shouldExpandNode={collapseAllNested}
                  style={customTheme}
                />
              )}

              {!moeda?.resposta && <Text>N/A</Text>}
            </Box>
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
