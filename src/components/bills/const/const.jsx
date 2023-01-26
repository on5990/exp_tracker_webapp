const MONTHLY_UND = "Monthly-Undefined";
const YEARLY_UND = "Yearly-Undefined";
const MONTHLY_FIXED = "Monthly-Fixed";
const YEARLY_FIXED = "Yearly-Fixed";

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
