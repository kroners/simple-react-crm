import {
  checkUserInNationalIdentificationService,
  checkUserJudicialRecords,
} from '../api/external-services';

describe('External services', () => {
  describe('checkUserInNationalIdentificationService', () => {
    it('user is registered in National Identification service', () => {
      const isUserInNationalIdentification = checkUserInNationalIdentificationService(1);

      expect(isUserInNationalIdentification).toBeTruthy();
    });
    it('user is not registered in National Identification service', () => {
      const isUserInNationalIdentification = checkUserInNationalIdentificationService();

      expect(isUserInNationalIdentification).toBeFalsy();
    });
  });

  describe('checkUserJudicialRecords', () => {
    it('user has Judicial record', () => {
      const hasUserJudicialRecords = checkUserJudicialRecords();

      expect(hasUserJudicialRecords).toBeTruthy();
    });
    it('user does not have Judicial records', () => {
      const hasUserJudicialRecords = checkUserJudicialRecords(1);

      expect(hasUserJudicialRecords).toBeFalsy();
    });
  });
});
