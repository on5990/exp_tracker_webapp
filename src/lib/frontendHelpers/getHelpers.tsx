function getById(id: string, list: Array<any>): any {
  let found = false;
  list.map((item) => {
    if (item?._id === id || item?.id === id) {
      found = item;
    }
  });
  return found;
}
export default { getById };
