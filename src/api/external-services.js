export const checkUserInNationalIdentificationService = (nin) => {
  const isUserRegistered = nin ? true : false;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isUserRegistered) {
        resolve(isUserRegistered);
      } else {
        reject({ message: 'Error' });
      }
    }, 100);
  });
};

export const checkUserJudicialRecords = (nin) => {
  const hasRecords = nin ? false : true;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!hasRecords) {
        resolve(hasRecords);
      } else {
        reject({ message: 'Error' });
      }
    }, 100);
  });
};
