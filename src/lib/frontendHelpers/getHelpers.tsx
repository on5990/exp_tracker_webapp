function getById(id: string, list: Array<any>): any {
  let found = false;
  list.map((item) => {
    if (item?._id === id || item?.id === id) {
      found = item;
    }
  });
  return found;
}
function getPropById(id: string, list: Array<any>, propName: string): any {
  let found = false;
  list.map((item) => {
    if (item?._id === id || item?.id === id) {
      found = item;
    }
  });
  return found ? found[propName] : found;
}
function getPropCustomId(
  id: string,
  idName: string,
  list: Array<any>,
  propName: string
): any {
  let found = false;
  list.map((item) => {
    if (item[idName] === id) {
      found = item;
    }
  });
  return found ? found[propName] : found;
}
export default { getById, getPropById, getPropCustomId };
