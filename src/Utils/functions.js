export default {
  convertArrayToObject: (array = [], key) => {
    const obj = {};
    for (const item of array) {
      if (!item[key]) return {};
      obj[item[key]] = item;
    }
    return obj;
  },
  convertObjectToArray: (obj) => {
    let arr = [];
    for (const key in obj) {
      arr.push(obj[key]);
    }
    return arr;
  },
  convertDateTime: (date) => {
    const datetime = new Date(date);
    if (isNaN(datetime)) return "";
    return datetime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  },
};
