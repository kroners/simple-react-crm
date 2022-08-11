import data from './data.json';
import {
  checkUserInNationalIdentificationService,
  checkUserJudicialRecords,
} from './external-services';

export const isUserExistInNationalIdentification = (nin) => {
  checkUserInNationalIdentificationService(nin);
};

export const hasUserJudicialRecords = (nin) => {
  checkUserJudicialRecords(nin);
};

export const getProspectQualification = (id) => {
  return Math.floor(Math.random() * 100);
};

export const getLeads = () => data.leads;

export const getShouldUserBeProspect = async (nin) => {
  const isUserInNationalRegistry = await checkUserInNationalIdentificationService(
    nin
  ).then((res) => res);
  const hasUserJudicialRecords = await checkUserJudicialRecords(nin).then((res) => res);

  if (isUserInNationalRegistry && !hasUserJudicialRecords) {
    return getProspectQualification(nin);
  } else {
    alert('User does not meet the requirements');
  }
};
