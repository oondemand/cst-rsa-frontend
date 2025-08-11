import { CpfCnpjCell } from "../../components/dataGrid/cells/cpfCnpjCell";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";
import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { DefaultCell } from "../../components/dataGrid/cells/default";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";
import { DisabledDefaultCell } from "../../components/dataGrid/cells/disabledDefaultCell";

import { PessoasDialog } from "./dialog";

import {
  REGIME_TRIBUTARIO_OPTIONS,
  STATUS_PESSOA_OPTIONS,
  TIPO_PESSOA_OPTIONS,
} from "../../constants";

import { LISTA_PAISES_OMIE } from "../../constants/omie";
import { DeletePessoaAction } from "../../components/dataGrid/actions/deletePessoaButton";
import { SelectPrestadorCell } from "../../components/dataGrid/cells/selectPrestador";

export const makeDynamicColumns = () => {
  const STATUS_PAGAMENTO_MAP = [
    { label: "Em aberto", value: "aberto" },
    { label: "Processando", value: "processando" },
    { label: "Pago", value: "pago" },
  ];

  const STATUS_VALIDACAO_MAP = [
    { label: "Pendente", value: "pendente" },
    { label: "Recusado", value: "recusado" },
    { label: "Aprovado", value: "aprovado" },
  ];

  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ];

  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      enableColumnFilter: true,
      cell: (props) => (
        <TableActionsCell>
          {/* <DeletePessoaAction id={props.row.original?._id} />
          <PessoasDialog label="Pessoa" defaultValues={props.row.original} />
          <SyncOmieStatusCell {...props} /> */}
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "_id" },
    },
    {
      accessorKey: "pessoa",
      header: "Cliente ou prestador",
      enableSorting: false,
      cell: SelectPrestadorCell,
      enableColumnFilter: true,
      meta: {
        filterVariant: "selectPrestador",
        filterKey: "pessoa",
      },
    },
    {
      accessorKey: "tipoDocumentoFiscal",
      header: "Documento Fiscal",
      enableSorting: false,
      cell: (props) => (
        <SelectListaCell {...props} cod={"tipo-documento-fiscal"} />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "tipoDocumentoFiscal",
        filterVariant: "selectLista",
        cod: "tipo-documento-fiscal",
      },
    },
    {
      accessorKey: "numero",
      header: "Numero",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: {
        filterKey: "numero",
      },
    },
    {
      accessorKey: "valor",
      header: "Valor",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valor" },
    },
    {
      accessorKey: "imposto",
      header: "Imposto",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "imposto" },
    },
    {
      accessorKey: "classificacaoFiscal",
      header: "Classificação Fiscal",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "classificacaoFiscal" },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "descricao" },
    },
    {
      accessorKey: "motivoRecusa",
      header: "Motivo recusa",
      enableSorting: false,
      cell: (props) => <SelectListaCell {...props} cod={"motivo-recusa"} />,
      enableColumnFilter: true,
      meta: {
        filterKey: "motivoRecusa",
        filterVariant: "selectLista",
        cod: "motivo-recusa",
      },
    },
    {
      accessorKey: "observacao",
      header: "Observação",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "observacao" },
    },
    {
      accessorKey: "statusValidacao",
      header: "Status validação",
      enableSorting: false,
      cell: (props) => (
        <SelectAutoCompleteCell {...props} options={STATUS_VALIDACAO_MAP} />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "statusValidacao",
        filterVariant: "select",
        filterOptions: STATUS_VALIDACAO_MAP,
      },
    },
    {
      accessorKey: "statusPagamento",
      header: "Status pagamento",
      enableSorting: false,
      cell: (props) => (
        <SelectAutoCompleteCell {...props} options={STATUS_PAGAMENTO_MAP} />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "statusPagamento",
        filterVariant: "select",
        filterOptions: STATUS_PAGAMENTO_MAP,
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: DisabledDefaultCell,
      enableColumnFilter: true,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: statusOptions,
      },
    },
  ];
};
