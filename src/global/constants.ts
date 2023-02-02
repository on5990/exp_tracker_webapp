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

const EXPENSE_CACHE = "expense_data";
const BILL_CACHE = "bill_data";
const BUDGET_CACHE = "budget_data";

const REQUEST_EXPENSE = "request_expense";
const REQUEST_BUDGET = "request_budget";
const REQUEST_BILL = "request_bill";
const REQUEST_TRUE = { request: true };
const REQUEST_FALSE = { request: false };

const SECTION_CACHE = "section";
const EXPENSE_SECTION = { section: "expense_section" };
const BUDGET_SECTION = { section: "budget_section" };
const BILL_SECTION = { section: "bill_section" };
const CHARTS_SECTION = { section: "charts_section" };

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
  EXPENSE_CACHE,
  BILL_CACHE,
  BUDGET_CACHE,
  REQUEST_BILL,
  REQUEST_EXPENSE,
  REQUEST_BUDGET,
  REQUEST_FALSE,
  REQUEST_TRUE,
  SECTION_CACHE,
  EXPENSE_SECTION,
  BUDGET_SECTION,
  BILL_SECTION,
  CHARTS_SECTION,
};
