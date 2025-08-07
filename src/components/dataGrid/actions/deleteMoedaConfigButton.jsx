import { IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../ui/toaster";
import { queryClient } from "../../../config/react-query";
import { api } from "../../../config/api";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { Tooltip } from "../../ui/tooltip";
import { ORIGENS } from "../../../constants/origens";
// import { useDeleteAssistantConfig } from "../../../hooks/api/assistant-config/useDeleteAssistantCongig";

export const DeleteMoedaConfigAction = ({ id }) => {
  const { requestConfirmation } = useConfirmation();

  // const deleteAssistantConfig = useDeleteAssistantConfig({
  //   onSuccess: () => queryClient.invalidateQueries(["listar-moeda-config"]),
  //   origem: ORIGENS.DATAGRID,
  // });

  const handleDeleteMoedaConfig = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja excluir moeda?",
      description: "Essa operação não pode ser desfeita.",
    });

    if (action === "confirmed") {
      // await deleteAssistantConfig.mutateAsync({ id });
    }
  };

  return (
    <Tooltip content="Excluir moeda" openDelay={700} closeDelay={50}>
      <IconButton
        variant="surface"
        colorPalette="red"
        size="2xs"
        onClick={handleDeleteMoedaConfig}
      >
        <Trash />
      </IconButton>
    </Tooltip>
  );
};
