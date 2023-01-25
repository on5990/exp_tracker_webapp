const MONTHLY_UND = "Mensual-Indefinido";
const YEARLY_UND = "Anual-Indefinido";
const MONTHLY_FIXED = "Mensual-Fijo";
const YEARLY_FIXED = "Anual-Fijo";

const types = [
  {
    id: 1,
    label: "Mensual, cantidad indefinida de cuotas",
    value: MONTHLY_FIXED,
  },
  { id: 2, label: "Mensual, cantidad fija de cuotas", value: MONTHLY_UND },
  { id: 3, label: "Anual, cantidad indefinida de cuotas", value: YEARLY_FIXED },
  { id: 4, label: "Anual, cantidad fija de cuotas", value: YEARLY_UND },
];
export { MONTHLY_FIXED, YEARLY_FIXED, MONTHLY_UND, YEARLY_UND, types };
