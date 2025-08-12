import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import changelog from "../../docs/pages/changelog/changelog.md?raw";
import { Prose } from "../../components/ui/prose";

export default function ChangelogPage() {
  return (
    <Box h="full" w="full" overflow="auto" bg="#F8F9FA" pt="8" pl="8">
      <Prose shadow="xs" minW="full" p="8" bg="white" roundedLeft="lg">
        <ReactMarkdown>{changelog}</ReactMarkdown>
      </Prose>
    </Box>
  );
}
