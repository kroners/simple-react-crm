import { getShouldUserBeProspect } from '../api/internal-service';

import * as externalServices from '../api/external-services';
import * as qualificationService from '../api/qualification';

describe('Internal services', () => {
  describe('getShouldUserBeProspect', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    function mockValidationExternalServices(first, second) {
      jest
        .spyOn(externalServices, 'getIsUserInNationalIdentificationService')
        .mockImplementation(() => Promise.resolve(first));

      jest
        .spyOn(externalServices, 'getUserHasJudicialRecords')
        .mockImplementation(() => Promise.resolve(second));
    }

    it('user does not meet requirements', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      mockValidationExternalServices(false, true);

      await getShouldUserBeProspect(100);

      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    it('user gets down qualification', async () => {
      jest.doMock('../api/internal-service', () => ({
        ...jest.requireActual('../api/internal-service'),
        getShouldUserBeProspect: jest.fn(() => Promise.resolve(59)),
      }));

      const { getShouldUserBeProspect } = require('../api/internal-service');

      const qualification = await getShouldUserBeProspect(100).then((res) => res);

      expect(qualification).toEqual(59);
    });

    it('user gets proper qualification', async () => {
      mockValidationExternalServices(true, false);

      jest
        .spyOn(qualificationService, 'getLeadQualification')
        .mockImplementation(() => 70);

      const qualification = await getShouldUserBeProspect(100).then((res) => res);

      expect(qualification).toEqual(70);
    });
  });
});
