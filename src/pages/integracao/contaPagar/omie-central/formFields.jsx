import { DefaultField } from "../../../../components/buildForm/filds/default";
import { CurrencyField } from "../../../../components/buildForm/filds/currencyField";
import { DateField } from "../../../../components/buildForm/filds/dateField";

export const createDynamicFormFields = () => {
  return [
    {
      accessorKey: "valor_documento",
      label: "Valor",
      render: CurrencyField,
      colSpan: 1,
    },
    {
      accessorKey: "status_titulo",
      label: "Status",
      render: DefaultField,
      colSpan: 1,
    },
    {
      accessorKey: "numero_documento",
      label: "Numero do documento",
      render: DefaultField,
      colSpan: 1,
    },
    {
      accessorKey: "numero_documento_fiscal",
      label: "Numero do documento fiscal",
      render: DefaultField,
      colSpan: 1,
    },
    {
      accessorKey: "codigo_categoria",
      label: "Código da categoria",
      render: DefaultField,
      colSpan: 1,
    },
    {
      accessorKey: "data_emissao",
      label: "Data de emissão",
      render: DateField,
      colSpan: 1,
    },
    {
      accessorKey: "data_vencimento",
      label: "Data de vencimento",
      render: DateField,
      colSpan: 1,
    },
    {
      accessorKey: "data_previsao",
      label: "Data de Previsão",
      render: DateField,
      colSpan: 1,
    },
    {
      accessorKey: "data_entrada",
      label: "Data de entrada",
      render: DateField,
      colSpan: 1,
    },
    {
      accessorKey: "observacao",
      label: "Observação",
      render: DefaultField,
      colSpan: 2,
    },
  ];
};
