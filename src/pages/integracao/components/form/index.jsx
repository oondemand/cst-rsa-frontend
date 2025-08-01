import { BuildForm } from "../../../../components/buildForm";
import { useVisibleInputForm } from "../../../../hooks/useVisibleInputForms";
import { Grid, GridItem, Text, Box } from "@chakra-ui/react";

export const Form = ({ data, stateKey, fields, titulo }) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: `integracao_${stateKey}_form`,
  });

  return (
    <>
      {data && (
        <Grid mt="4" templateColumns="repeat(4, 1fr)" gap="4">
          <GridItem colSpan={1} mt="6">
            <Box w="100px">
              <Text color="gray.600" fontSize="sm">
                {titulo}
              </Text>
            </Box>
          </GridItem>
          <GridItem colSpan={3} mt="6">
            <BuildForm
              fields={fields}
              gap={2}
              data={data}
              disabled={true}
              gridColumns={2}
              visibleState={inputsVisibility}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
