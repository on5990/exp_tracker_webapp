const SPECIFIC = "Específico";
const CATEGORY = "Total por categoría";
const MONTH = "Mes";
const YEAR = "Año";
const WEEK = "Semana";
const TYPE_CATEGORY = "Categoría";
const MONTHLY_UND = "Monthly-Undefined";
const YEARLY_UND = "Yearly-Undefined";
const MONTHLY_FIXED = "Monthly-Fixed";
const YEARLY_FIXED = "Yearly-Fixed";
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const BUDGET_OK = "Ok";
const BUDGET_EXCEEDED = "Excedido";
const filterTypes = [
  { id: 1, label: "Filtrar por mes", value: MONTH },
  { id: 2, label: "Filtrar por año", value: YEAR },
];
const types = [
  {
    id: 1,
    label: "Mensual, cantidad indefinida de cuotas",
    value: MONTHLY_UND,
  },
  { id: 2, label: "Mensual, cantidad fija de cuotas", value: MONTHLY_FIXED },
  { id: 3, label: "Anual, cantidad indefinida de cuotas", value: YEARLY_UND },
  { id: 4, label: "Anual, cantidad fija de cuotas", value: YEARLY_FIXED },
];
const BILL_ACTIVE = "Activo";
const BILL_FINISHED = "Finalizado";
const BILL_OVERDUE = "Atrasado";
const ACT_CREATE = "Crear";
const ACT_UPDATE = "Actualizar";
export {
  SPECIFIC,
  CATEGORY,
  MONTH,
  YEAR,
  WEEK,
  TYPE_CATEGORY,
  MONTHLY_FIXED,
  YEARLY_FIXED,
  YEARLY_UND,
  MONTHLY_UND,
  MONTHS,
  filterTypes,
  BUDGET_OK,
  BUDGET_EXCEEDED,
  BILL_ACTIVE,
  BILL_FINISHED,
  BILL_OVERDUE,
  ACT_CREATE,
  ACT_UPDATE,
  types,
};
