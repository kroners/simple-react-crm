export const getIsUserInNationalIdentificationService = (nin) => {
  const isUserRegistered = nin ? true : null;
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

export const getUserHasJudicialRecords = (nin) => {
  const hasRecords = nin ? null : true;
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
