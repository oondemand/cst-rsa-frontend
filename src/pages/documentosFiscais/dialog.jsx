import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { queryClient } from "../../config/react-query";
import { createDynamicFormFields } from "./formFields";
import { useUpdateDocumentoFiscal } from "../../hooks/api/documento-fiscal/useUpdateDocumentoFiscal";
import { useCreateDocumentoCadastral } from "../../hooks/api/documento-fiscal/useCreateDocumentoFiscal";
import { useLoadAssistant } from "../../hooks/api/assistant-config/useLoadAssistant";
import { useIaChat } from "../../hooks/useIaChat";
import { FormDialog } from "../../components/formDialog";
import {
  DefaultTrigger,
  IconTrigger,
} from "../../components/formDialog/form-trigger";
import { ORIGENS } from "../../constants/origens";
import {
  FileUploadRoot,
  FileUploadTrigger,
} from "../../components/ui/file-upload";
import { useUploadFileToDocumentoFiscal } from "../../hooks/api/documento-fiscal/useUploadFIle";
import { Paperclip, Download, CircleX } from "lucide-react";
import { ServicoTomadoTicketService } from "../../service/servicoTomadoTicket";
import { useDeleteFileFromDocumentoFiscal } from "../../hooks/api/documento-fiscal/useDeleteFileFromDocumentoFiscal";
import { useConfirmation } from "../../hooks/useConfirmation";

export const DocumentosFiscaisDialog = ({
  defaultValues = null,
  label = "Adicionar documento fiscal",
}) => {
  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { onOpen } = useIaChat();
  const { assistant } = useLoadAssistant(["documento-fiscal"]);
  const fields = useMemo(() => createDynamicFormFields(), []);
  const { requestConfirmation } = useConfirmation();

  const updateDocumentoFiscal = useUpdateDocumentoFiscal({
    origem: ORIGENS.FORM,
    onSuccess: (data) => {
      if (open)
        setData((prev) =>
          data?.documentoFiscal ? data.documentoFiscal : prev
        );
    },
  });

  const createDocumentoFiscal = useCreateDocumentoCadastral({
    origem: ORIGENS.FORM,
    onSuccess: (data) => {
      if (open)
        setData((prev) =>
          data?.documentoFiscal ? data.documentoFiscal : prev
        );
    },
  });

  const onSubmit = async (values) => {
    const competencia = values?.competencia?.split("/");
    const mes = Number(competencia?.[0]) || null;
    const ano = Number(competencia?.[1]) || null;

    const body = {
      ...values,
      pessoa: values?.pessoa?.value,
      ...(values?.competencia !== ""
        ? {
            competencia: {
              mes,
              ano,
            },
          }
        : {}),
    };

    if (!data) return await createDocumentoFiscal.mutateAsync({ body });
    return await updateDocumentoFiscal.mutateAsync({
      body,
      id: data._id,
    });
  };

  const uploadFile = useUploadFileToDocumentoFiscal({
    onSuccess: ({ data }) => {
      setData((prev) => ({
        ...prev,
        arquivo: data?.arquivo,
      }));
    },
  });

  const deleteDocumentoFiscal = useDeleteFileFromDocumentoFiscal({
    onSuccess: () => setData((prev) => ({ ...prev, arquivo: null })),
  });

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

  const handleRemoveFile = async ({ id }) => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que excluir arquivo?",
      description: "Essa operação não pode ser desfeita!",
    });

    if (action === "confirmed") {
      await deleteDocumentoFiscal.mutateAsync({ id, data });
    }
  };

  useEffect(() => {
    setData(defaultValues);
  }, [defaultValues]);

  return (
    <Box>
      <Box onClick={() => setOpen(true)} asChild>
        {defaultValues ? <IconTrigger /> : <DefaultTrigger />}
      </Box>
      <FormDialog
        data={{ ...data }}
        fields={fields}
        label={label}
        onOpenAssistantDialog={() => onOpen(data, assistant)}
        onSubmit={onSubmit}
        onOpenChange={() => {
          queryClient.invalidateQueries(["listar-documentos-fiscais"]);
          setOpen(false);
          setData(defaultValues);
        }}
        open={open}
        stateKey="documentos-fiscais"
      >
        {data && !data?.arquivo && (
          <Box mt="8">
            <FileUploadRoot
              accept="application/pdf"
              onFileAccept={async (e) => {
                await uploadFile.mutateAsync({
                  files: e.files[0],
                  id: data?._id,
                });
              }}
            >
              <FileUploadTrigger>
                <Button
                  disabled={uploadFile.isPending}
                  mt="4"
                  size="2xs"
                  variant="surface"
                  color="gray.600"
                >
                  Anexar arquivo
                </Button>
              </FileUploadTrigger>
            </FileUploadRoot>
          </Box>
        )}
        {data && data?.arquivo && (
          <Box mt="8">
            <Text fontWeight="semibold" color="gray.700">
              Arquivo
            </Text>
            <Flex mt="4" gap="3" alignItems="center">
              <Paperclip color="purple" size={16} />
              <Text color="gray.600">
                {data?.arquivo?.nomeOriginal}{" "}
                {(data?.arquivo?.size / 1024).toFixed(1)} KB
              </Text>
              <Flex gap="2">
                <Button
                  onClick={async () =>
                    await handleDownloadFile({ id: data?.arquivo?._id })
                  }
                  color="gray.600"
                  cursor="pointer"
                  unstyled
                >
                  <Download size={16} />
                </Button>
                <Button
                  onClick={async () =>
                    await handleRemoveFile({
                      id: data?.arquivo?._id,
                    })
                  }
                  color="red"
                  cursor="pointer"
                  unstyled
                >
                  <CircleX size={16} />
                </Button>
              </Flex>
            </Flex>
          </Box>
        )}
      </FormDialog>
    </Box>
  );
};
