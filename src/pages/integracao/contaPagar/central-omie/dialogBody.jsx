import { Form } from "../../components/form";
import { RequisicaoDetails } from "../../components/requisicaoDetails";
import { createDynamicFormFields } from "./formFields";

export const TicketBody = ({ ticket }) => {
  return (
    <>
      <Form
        titulo="Conta pagar"
        data={ticket.payload}
        fields={createDynamicFormFields()}
        stateKey="pessoa_central_omie"
      />
      <RequisicaoDetails ticket={ticket} />
    </>
  );
};
