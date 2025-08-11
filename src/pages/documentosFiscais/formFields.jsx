import { SelectPrestadorField } from "../../components/buildForm/fields/selectPrestadorField";
import { z } from "zod";
import { SelectListaField } from "../../components/buildForm/fields/selectListaField";
import { DefaultField } from "../../components/buildForm/filds/default";
import { CurrencyField } from "../../components/buildForm/filds/currencyField";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";

export const createDynamicFormFields = () => {
  return [
    {
      label: "Detalhes",
      group: [
        {
          accessorKey: "pessoa",
          label: "Cliente ou prestador",
          render: SelectPrestadorField,
          validation: z.object(
            { label: z.string(), value: z.string() },
            { message: "Prestador é obrigatório" }
          ),
          colSpan: 2,
        },
        {
          accessorKey: "tipoDocumentoFiscal",
          label: "Tipo de documento",
          cod: "tipo-documento-fiscal",
          render: SelectListaField,
          validation: z.string({
            message: "Campo obrigatório",
          }),
          colSpan: 1,
        },
        {
          accessorKey: "numero",
          label: "Numero",
          render: DefaultField,
          validation: z.string().nonempty("Número é obrigatório"),
          colSpan: 1,
        },
        {
          accessorKey: "valor",
          label: "Valor",
          render: CurrencyCell,
        },
        {
          accessorKey: "imposto",
          label: "Imposto",
          render: CurrencyCell,
        },
        // {
        //   accessorKey: "classificacaoFiscal",
        //   label: "Classificação Fiscal",
        //   render: DefaultEditableCell,
        // },
      ],
    },
    // {
    //   label: "Informações adicionais",
    //   group: [
    //     {
    //       accessorKey: "motivoRecusa",
    //       label: "Motivo Recusa",
    //       cod: "motivo-recusa",
    //       render: SelectListaField,
    //       validation: z.string().optional(),
    //       colSpan: 2,
    //     },
    //     {
    //       accessorKey: "descricao",
    //       label: "Descrição",
    //       render: DefaultField,
    //       validation: z.string().optional(),
    //       colSpan: 4,
    //     },
    //     // {
    //     //   accessorKey: "observacaoPrestador",
    //     //   label: "Observação Prestador",
    //     //   render: DefaultField,
    //     //   validation: z.string().optional(),
    //     //   colSpan: 4,
    //     // },
    //     {
    //       accessorKey: "observacao",
    //       label: "Observação",
    //       render: DefaultField,
    //       validation: z.string().optional(),
    //       colSpan: 4,
    //     },
    //   ],
    // },
  ];
};

// {
//     accessorKey: "tipoDocumentoFiscal",
//     header: "Documento Fiscal",
//     enableSorting: false,
//     cell: (props) => (
//       <SelectListaCell {...props} cod={"tipo-documento-fiscal"} />
//     ),
//     enableColumnFilter: true,
//     meta: {
//       filterKey: "tipoDocumentoFiscal",
//       filterVariant: "selectLista",
//       cod: "tipo-documento-fiscal",
//     },
//   },
//   {
//     accessorKey: "numero",
//     header: "Numero",
//     enableSorting: false,
//     cell: DefaultEditableCell,
//     enableColumnFilter: true,
//     meta: {
//       filterKey: "numero",
//     },
//   },
//   {
//     accessorKey: "valor",
//     header: "Valor",
//     enableSorting: false,
//     cell: CurrencyCell,
//     enableColumnFilter: true,
//     meta: { filterKey: "valor" },
//   },
//   {
//     accessorKey: "imposto",
//     header: "Imposto",
//     enableSorting: false,
//     cell: CurrencyCell,
//     enableColumnFilter: true,
//     meta: { filterKey: "imposto" },
//   },
//   {
//     accessorKey: "classificacaoFiscal",
//     header: "Classificação Fiscal",
//     enableSorting: false,
//     cell: DefaultEditableCell,
//     enableColumnFilter: true,
//     meta: { filterKey: "classificacaoFiscal" },
//   },
//   {
//     accessorKey: "descricao",
//     header: "Descrição",
//     enableSorting: false,
//     cell: DefaultEditableCell,
//     enableColumnFilter: true,
//     meta: { filterKey: "descricao" },
//   },
//   {
//     accessorKey: "motivoRecusa",
//     header: "Motivo recusa",
//     enableSorting: false,
//     cell: (props) => <SelectListaCell {...props} cod={"motivo-recusa"} />,
//     enableColumnFilter: true,
//     meta: {
//       filterKey: "motivoRecusa",
//       filterVariant: "selectLista",
//       cod: "motivo-recusa",
//     },
//   },
//   {
//     accessorKey: "observacao",
//     header: "Observação",
//     enableSorting: false,
//     cell: DefaultEditableCell,
//     enableColumnFilter: true,
//     meta: { filterKey: "observacao" },
//   },
//   {
//     accessorKey: "statusValidacao",
//     header: "Status validação",
//     enableSorting: false,
//     cell: (props) => (
//       <SelectAutoCompleteCell {...props} options={STATUS_VALIDACAO_MAP} />
//     ),
//     enableColumnFilter: true,
//     meta: {
//       filterKey: "statusValidacao",
//       filterVariant: "select",
//       filterOptions: STATUS_VALIDACAO_MAP,
//     },
//   },
//   {
//     accessorKey: "statusPagamento",
//     header: "Status pagamento",
//     enableSorting: false,
//     cell: (props) => (
//       <SelectAutoCompleteCell {...props} options={STATUS_PAGAMENTO_MAP} />
//     ),
//     enableColumnFilter: true,
//     meta: {
//       filterKey: "statusPagamento",
//       filterVariant: "select",
//       filterOptions: STATUS_PAGAMENTO_MAP,
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     enableSorting: false,
//     cell: DisabledDefaultCell,
//     enableColumnFilter: true,
//     meta: {
//       filterKey: "status",
//       filterVariant: "select",
//       filterOptions: statusOptions,
//     },
//   },
