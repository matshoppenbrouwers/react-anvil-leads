import React, { useState, useEffect } from 'react';

function App() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState('');
  const [projects, setProjects] = useState([]);

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
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    }
    fetchLeads();
  }, []);

  // Fetch the projects for the selected lead
  const fetchProjectsForLead = async (lead) => {
    try {
      const response = await fetch('https://lamp-landing.anvil.app/_/api/get_projects_for_lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lead })  // Pass the selected lead to the server
      });
      const data = await response.json();
      setProjects(data);  // Set the fetched projects
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Handle the event when a project lead is selected
  const handleLeadChange = (event) => {
    const lead = event.target.value;
    console.log(`Selected lead: ${lead}`);  // Log the selected lead
    setSelectedLead(lead);
    if (lead) {
      console.log('Fetching projects for selected lead...');  // Log fetch initiation
      fetchProjectsForLead(lead);  // Fetch associated projects
    } else {
      setProjects([]);  // Clear the projects list if no lead is selected
    }
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

      {/* Display associated projects */}
      {projects.length > 0 && (
        <div>
          <h3>Associated Projects:</h3>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
