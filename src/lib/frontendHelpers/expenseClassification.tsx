import { MONTH, YEAR } from "@/global/constants";
function classifyByTime(time: string, expenses: Array<any>, type: string) {
  try {
    let start: any;
    let end: any;
    const timeArray = time.split(",");
    if (type === MONTH) {
      const month = parseInt(timeArray[0]);
      const year = parseInt(timeArray[1]);
      start = new Date(year, month, 1, 0, 0, 0);
      end = new Date(year, month + 1, 0, 23, 59, 59);
    } else if (type === YEAR) {
      const year = parseInt(timeArray[0]);
      start = new Date(year, 0, 1, 0, 0, 0);
      end = new Date(year, 11, 31, 23, 59, 59);
    } else {
      return expenses;
    }
    if (!Date.parse(start) || !Date.parse(end)) {
      return expenses;
    }
    const exp = expenses.reduce((acc, current) => {
      if (
        new Date(current.spentAt).getTime() >= new Date(start).getTime() &&
        new Date(current.spentAt).getTime() <= new Date(end).getTime()
      ) {
        acc[current._id] = { ...current };
        return acc;
      }
      return acc;
    }, {});
    return Object.values(exp);
  } catch (error) {
    console.log(error);
  }
}
export default { classifyByTime };
