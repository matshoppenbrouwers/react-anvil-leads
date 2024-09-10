import React, { useState, useEffect } from 'react';

function App() {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState('');

    // Fetch the project leads from the Anvil backend
    useEffect(() => {
      async function fetchLeads() {
        try {
          const response = await fetch('https://lamp-landing.anvil.app/_/api/get_unique_project_leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
          console.log(data);  // Log the response data to see if it's an array of strings
          setLeads(data);     // Set the leads state with the returned data
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      }
      fetchLeads();
    }, []);


    const handleLeadChange = (event) => {
        setSelectedLead(event.target.value);
    };

    return (
      <div className="App">
        <h1>Select a Project Lead</h1>
        <div>
          <select value={selectedLead} onChange={handleLeadChange}>
            <option value="">-- Select a Lead --</option>
            {leads.map((lead, index) => (
              <option key={index} value={lead}>
                {lead}
              </option>
            ))}
          </select>
        </div>
        {selectedLead && <h2>Selected Lead: {selectedLead}</h2>}
      </div>
    );
}

export default App;
