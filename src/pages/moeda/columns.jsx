import React from "react";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";
import { DefaultCell } from "../../components/dataGrid/cells/default";

import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { AssistenteConfigDialog } from "./dialog";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { DeleteAssistenteConfigAction } from "../../components/dataGrid/actions/deleteAssistenteConfigButton";

import { SelectAssistantCell } from "../../components/dataGrid/cells/selectAssistantCell";
import { format } from "date-fns";
import { MoedaRequisicaoDetailsCell } from "../../components/dataGrid/cells/moedaRequisicaoDetailsCell";

export const makeMoedaDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: (props) => (
        <TableActionsCell>
          <MoedaRequisicaoDetailsCell moeda={props.row.original} />
          {/* <DeleteAssistenteConfigAction id={props.row.original?._id} />
          <AssistenteConfigDialog
            label="Assistente"
            defaultValues={{
              ...props.row.original,
            }}
          /> */}
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "sigla",
      header: "Moeda",
      cell: DefaultCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "sigla" },
    },
    {
      accessorKey: "cotacao",
      header: "Cotação",
      cell: (props) => <CurrencyCell {...props} prefix="R$" />,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "cotacao" },
    },
    {
      accessorKey: "updatedAt",
      header: "Atualizado em",
      cell: (props) => (
        <DefaultCell
          {...{
            ...props,
            getValue: () => {
              return format(props.getValue(), "dd/MM/yyyy HH:mm");
            },
          }}
        />
      ),
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "updatedAt" },
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: (props) => (
    //     <SelectAutoCompleteCell
    //       {...props}
    //       options={[
    //         { label: "Ativo", value: "ativo" },
    //         { label: "Inativo", value: "inativo" },
    //       ]}
    //     />
    //   ),
    //   enableColumnFilter: true,
    //   enableSorting: false,
    //   meta: {
    //     filterKey: "status",
    //     filterVariant: "select",
    //     filterOptions: [
    //       { label: "Ativo", value: "ativo" },
    //       { label: "Inativo", value: "inativo" },
    //     ],
    //   },
    // },
  ];
};
