import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import * as externalServices from './api/external-services';
import * as internalServices from './api/internal-service';
import * as qualificationService from './api/qualification';

describe('App', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  it('Renders App', async () => {
    render(<App />);
    const prospectsElement = await screen.findByText(/Prospects/i);
    const leadsElement = await screen.findByText(/Leads/i);
    expect(prospectsElement).toBeInTheDocument();
    expect(leadsElement).toBeInTheDocument();
  });

  it('Trigger user validation', async () => {
    const data = [
      {
        id: 1,
        first_name: 'Starlin',
        last_name: 'Gillebert',
        email: 'sgillebert0@cnet.com',
        gender: 'Female',
        nin: '43-6819564',
        birthdate: '02/07/1990',
      },
    ];

    const mockedQualification = jest.fn(() => 70);

    jest
      .spyOn(externalServices, 'getIsUserInNationalIdentificationService')
      .mockImplementation(() => Promise.resolve(true));
    jest
      .spyOn(externalServices, 'getUserHasJudicialRecords')
      .mockImplementation(() => Promise.resolve(false));
    jest.spyOn(internalServices, 'getLeads').mockResolvedValue(data);
    jest
      .spyOn(qualificationService, 'getLeadQualification')
      .mockImplementation(mockedQualification);

    render(<App />);

    expect(await screen.findAllByRole('row')).toHaveLength(1);

    const validateButton = await screen.findByRole('button');
    fireEvent.click(validateButton);

    expect(mockedQualification).toHaveBeenCalled();
    expect(mockedQualification).toEqual(70);
  });
});
