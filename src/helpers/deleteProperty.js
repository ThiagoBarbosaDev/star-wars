const deleteProperty = (arrayOfObjects, propertyKey) => {
  const response = arrayOfObjects.map((object) => {
    const { [propertyKey]: keyToBeRemoved, ...rest } = object;
    return rest;
  });

  return response;
};

export default deleteProperty;
