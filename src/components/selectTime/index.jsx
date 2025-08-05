import { createListCollection } from "@chakra-ui/react";
import {
  SelectRoot,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValueText,
} from "../ui/select";

const selectTimeOptions = createListCollection({
  items: [
    { value: 1, label: "1 dia" },
    { value: 5, label: "5 dias" },
    { value: 10, label: "10 dias" },
    { value: 15, label: "15 dias" },
    { value: 30, label: "30 dias" },
  ],
});

export const SelectTime = ({ onValueChange, value }) => {
  return (
    <SelectRoot
      w="90px"
      size="xs"
      bg="white"
      defaultValue={[1]}
      collection={selectTimeOptions}
      value={value}
      onValueChange={({ value }) => {
        onValueChange?.(value);
      }}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Selecione um período..." />
      </SelectTrigger>
      <SelectContent>
        {selectTimeOptions.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
