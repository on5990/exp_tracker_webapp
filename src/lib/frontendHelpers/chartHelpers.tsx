import { MONTHS_SHORT } from "@/global/constants";

export function totalMonths(len: number, expenses: Array<any>) {
  const currentDate = new Date();
  const months = Array.from({ length: len }, (_, i) => {
    const start = new Date(
      currentDate.getFullYear(),
      +currentDate.getMonth() - (+len - i - 1),
      1,
      0,
      0,
      0
    );
    const end = new Date(
      start.getFullYear(),
      +start.getMonth() + +1,
      0,
      23,
      59,
      59
    );
    return { start, end };
  });
  const output = reduceTotal(months, expenses, "MONTH");
  return output;
}
export function totalWeeks(len: number, expenses: Array<any>) {
  const currentDate = new Date();
  const weekDay = currentDate.getDay();
  const lastWeekStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - +weekDay,
    0,
    0,
    0
  );
  const weeks = Array.from({ length: len }, (_, i) => {
    const weekTime = 7 * 24 * 60 * 60 * 1000;
    const subTime = weekTime * (+len - i - 1);
    const lastWeekStartTime = lastWeekStart.getTime();
    const start = new Date(lastWeekStartTime - subTime);
    const end = new Date(start.getTime() + weekTime - 1);
    return { start, end };
  });
  const output = reduceTotal(weeks, expenses, "WEEK");
  return output;
}
export function totalDays(len: number, expenses: Array<any>) {
  const currentDate = new Date();
  const lastDayStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );
  const days = Array.from({ length: len }, (_, i) => {
    const dayTime = 24 * 60 * 60 * 1000;
    const startTime = lastDayStart.getTime() - dayTime * (+len - i - 1);
    const start = new Date(startTime);
    const end = new Date(startTime + dayTime - 1);
    return { start, end };
  });
  const output = reduceTotal(days, expenses, "DAY");
  return output;
}
export function totalCategoryMonth() {}
export function totalCategoryYear() {}
export function getProps(name: string, arr: Array<any>) {
  let output: any[] = [];
  arr.map((item) => {
    if (item.hasOwnProperty(name)) {
      output.push(item[name]);
    }
  });
  return output;
}
function reduceTotal(
  timeIntervals: Array<any>,
  expenses: Array<any>,
  type: string
) {
  let output = expenses.reduce((acc, curr) => {
    timeIntervals.map((item) => {
      const startTime = item.start.getTime();
      const endTime = item.end.getTime();
      if (!acc.hasOwnProperty(startTime)) {
        acc[startTime] = {
          start: item.start,
          end: item.end,
          total: 0,
          label: getLabel(item.start, type),
        };
      }
      if (
        startTime <= new Date(curr.spentAt).getTime() &&
        endTime >= new Date(curr.spentAt).getTime()
      ) {
        acc[startTime] = {
          ...acc[startTime],
          total: +acc[startTime].total + +curr.sum,
        };
      }
    });
    return acc;
  }, {});
  output = Object.values(output);
  return output;
}
function getLabel(date: Date, type: string) {
  switch (type) {
    case "MONTH":
      return `${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
    case "WEEK":
      return `Sem ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
    case "DAY":
      return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
    default:
      return "";
  }
}
