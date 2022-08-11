import {
  getShouldUserBeProspect,
  hasUserJudicialRecords,
  isUserExistInNationalIdentification,
} from '../api/internal-service';

import * as internalServices from '../api/internal-service';
import * as externalServices from '../api/external-services';

describe('Internal services', () => {
  describe('isUserExistInNationalIdentification', () => {
    it('user is registered in National Identification service', () => {
      jest
        .spyOn(externalServices, 'checkUserInNationalIdentificationService')
        .mockResolvedValue(true);

      const isUserInNationalIdentification = isUserExistInNationalIdentification(1);

      expect(isUserInNationalIdentification).toBeTruthy();
    });
    it('user is not registered in National Identification service', () => {
      jest
        .spyOn(externalServices, 'checkUserInNationalIdentificationService')
        .mockResolvedValue(false);

      const isUserInNationalIdentification = isUserExistInNationalIdentification(1);

      expect(isUserInNationalIdentification).toBeFalsy();
    });
  });

  describe('hasUserJudicialRecords', () => {
    it('user has Judicial record', () => {
      jest.spyOn(externalServices, 'checkUserJudicialRecords').mockResolvedValue(true);

      const hasJudicialRecords = hasUserJudicialRecords();

      expect(hasJudicialRecords).toBeTruthy();
    });
    it('user does not have Judicial records', () => {
      jest.spyOn(externalServices, 'checkUserJudicialRecords').mockResolvedValue(false);

      const hasJudicialRecords = hasUserJudicialRecords(1);

      expect(hasJudicialRecords).toBeFalsy();
    });
  });

  describe('getShouldUserBeProspect', () => {
    const mockAlert = jest.fn();

    jest.spyOn(window, 'alert').mockImplementation(mockAlert);
    beforeAll(() => {
      jest.clearAllMocks();
    });

    it('user does not meet requirements', () => {
      jest
        .spyOn(externalServices, 'checkUserInNationalIdentificationService')
        .mockResolvedValue(false);
      jest.spyOn(externalServices, 'checkUserJudicialRecords').mockResolvedValue(true);

      getShouldUserBeProspect(100);

      expect(mockAlert).toHaveBeenCalled();
    });

    it('user gets down qualification', () => {
      jest
        .spyOn(externalServices, 'checkUserInNationalIdentificationService')
        .mockResolvedValue(true);
      jest.spyOn(externalServices, 'checkUserJudicialRecords').mockResolvedValue(false);

      jest.spyOn(internalServices, 'getProspectQualification').mockResolvedValue(59);

      const qualification = getShouldUserBeProspect(100);

      expect(qualification).toEqual(59);
    });

    it('user gets proper qualification', () => {
      jest
        .spyOn(externalServices, 'checkUserInNationalIdentificationService')
        .mockResolvedValue(true);
      jest.spyOn(externalServices, 'checkUserJudicialRecords').mockResolvedValue(false);

      jest.spyOn(internalServices, 'getProspectQualification').mockResolvedValue(70);

      const qualification = getShouldUserBeProspect(100);

      expect(qualification).toEqual(70);
    });
  });
});
