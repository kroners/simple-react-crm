import {
  getIsUserInNationalIdentificationService,
  getUserHasJudicialRecords,
} from '../api/external-services';

describe('External services', () => {
  describe('getIsUserInNationalIdentificationService', () => {
    it('user is registered in National Identification service', async () => {
      const isUserInNationalIdentification =
        await getIsUserInNationalIdentificationService(1).then((res) => res);

      expect(isUserInNationalIdentification).toBeTruthy();
    });
    it('user is not registered in National Identification service', async () => {
      const isUserInNationalIdentification =
        await getIsUserInNationalIdentificationService().then((res) => res);

      expect(isUserInNationalIdentification).toEqual({ message: 'Error' });
    });
  });

  describe('getUserHasJudicialRecords', () => {
    it('user has Judicial record', async () => {
      const hasUserJudicialRecords = await getUserHasJudicialRecords().then((res) => res);

      expect(hasUserJudicialRecords).toBeTruthy();
    });
    it('user does not have Judicial records', async () => {
      const hasUserJudicialRecords = await getUserHasJudicialRecords(1).then(
        (res) => res
      );

      expect(hasUserJudicialRecords).toEqual({ message: 'Error' });
    });
  });
});
