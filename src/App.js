import React, { useState, useEffect } from 'react';
import ProjectBlock from './ProjectBlock';

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
  const fetchProjectsForLead = async () => {
    if (!selectedLead) {
      alert('Please select a project lead before generating projects.');
      return;
    }

    try {
      const response = await fetch('https://lamp-landing.anvil.app/_/api/get_projects_for_lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lead: selectedLead })  // Pass the selected lead to the server
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched projects:', data);  // Log the fetched projects
      setProjects(data);  // Set the fetched projects
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

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

      <button onClick={fetchProjectsForLead}>Generate</button>

      {selectedLead && <h2>Selected Lead: {selectedLead}</h2>}

      {/* Dynamically generate project blocks */}
      {projects.length > 0 && projects.map((project, index) => (
        <ProjectBlock key={index} project={project} />
      ))}
    </div>
  );
}

export default App;
