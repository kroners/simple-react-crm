import './App.scss';
import { useEffect, useState } from 'react';
import { getLeads, getShouldUserBeProspect } from './api/internal-service';
import TableRow from './components/table-row';
import TableHeadItem from './components/table-head';
import CounterBox from './components/counter-box';

function App() {
  const [prospects, setProspects] = useState(0);
  const [leads, setLeads] = useState([]);

  const tableHeaders = [
    'Id',
    'Name',
    'Last name',
    'Email',
    'Gender',
    'Ident. Number',
    'Birthdate',
    'Actions',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeads();

      setLeads(data);
    };

    fetchData().catch(console.error);
  }, []);

  const moveUserToProspects = (id) => {
    const updatedLeads = leads.filter((elem) => elem.nin !== id);
    setLeads(updatedLeads);
  };

  const validateUser = async (id) => {
    const qualification = await getShouldUserBeProspect(id).then((res) => res);
    if (qualification > 60) {
      setProspects(prospects + 1);
      moveUserToProspects(id);
    } else {
      alert('User does not qualify');
    }
  };

  return (
    <div className="App">
      <header>Awesome CRM</header>
      <main>
        <div className="app__sales">
          <CounterBox title="Leads" value={leads.length} />
          <CounterBox title="Prospects" value={prospects} />
        </div>
        <div className="app__leads_details">
          <table className="leads__table">
            <thead>
              <tr>
                {tableHeaders.map((h) => {
                  return <TableHeadItem key={h} item={h} />;
                })}
              </tr>
            </thead>
            <tbody>
              {leads &&
                leads.map((item) => {
                  return <TableRow key={item.id} data={item} onValidate={validateUser} />;
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
