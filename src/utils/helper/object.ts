export const filterFilledObj = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] !== undefined && obj[key] !== '') {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};
