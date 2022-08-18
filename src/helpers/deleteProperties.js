const deleteProperties = (arrObj, arrStr) => arrObj
  .map((obj) => Object.keys(obj).reduce((acc, curr) => {
    if (arrStr.includes(curr)) { return acc; }
    return ({
      ...acc, [curr]: obj[curr],
    });
  }));

export default deleteProperties;
