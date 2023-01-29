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

const filterTypes = [
  { id: 1, label: "Filtrar por mes", value: MONTH },
  { id: 2, label: "Filtrar por año", value: YEAR },
];
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
};
