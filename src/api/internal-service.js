import data from './data.json';
import {
  getIsUserInNationalIdentificationService,
  getUserHasJudicialRecords,
} from './external-services';
import { getLeadQualification } from './qualification';

export const getLeads = () => data.leads;

export const getShouldUserBeProspect = async (nin) => {
  const isUserInNationalRegistry = await getIsUserInNationalIdentificationService(
    nin
  ).then((res) => res);
  const hasUserJudicialRecords = await getUserHasJudicialRecords(nin).then((res) => res);

  console.log({ isUserInNationalRegistry, hasUserJudicialRecords });

  if (isUserInNationalRegistry && !hasUserJudicialRecords) {
    const qualification = getLeadQualification(nin);
    return qualification;
  } else {
    console.log('alert');
    alert('User does not meet the requirements');
  }
};
