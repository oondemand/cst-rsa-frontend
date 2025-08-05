import { RequisicaoDetails } from "../../components/requisicaoDetails";
import { Text, Flex, Button, Box } from "@chakra-ui/react";
import { Paperclip, Download } from "lucide-react";
import { ServicoTomadoTicketService } from "../../../../service/servicoTomadoTicket";

export const TicketBody = ({ ticket }) => {
  const handleDownloadFile = async ({ id }) => {
    try {
      const { data } = await ServicoTomadoTicketService.getFile({ id });

      if (data) {
        const byteArray = new Uint8Array(data?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.mimetype });
        saveAs(blob, data?.nomeOriginal);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Box mt="8">
      <Text color="gray.600" fontSize="sm">
        Arquivo
      </Text>

      <Flex justifyContent="space-between" mt="4">
        <Text
          fontSize="sm"
          color="gray.500"
          fontWeight="normal"
          display="flex"
          gap="1.5"
          alignItems="center"
        >
          <Paperclip color="purple" size={12} /> {ticket?.payload?.nomeOriginal}
          {(ticket?.payload?.size / 1024).toFixed(1)} KB
        </Text>
        <Flex gap="2">
          <Button
            onClick={async () =>
              await handleDownloadFile({ id: ticket?.payload?._id })
            }
            cursor="pointer"
            unstyled
          >
            <Download size={16} />
          </Button>
        </Flex>
      </Flex>
      <RequisicaoDetails ticket={ticket} />
    </Box>
  );
};
