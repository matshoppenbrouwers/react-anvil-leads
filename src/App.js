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
      const response = await fetch('https://lamp-landing.anvil.app/_/api/get_projects_for_lead_aggregate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lead: selectedLead })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const projectData = await response.json();
      setProjects(projectData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleLeadChange = (event) => {
    setSelectedLead(event.target.value);
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '50px' }}>
      {/* Title at the top */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Laterite Master Planning Dashboard</h1>

      {/* Centered Dropdown and Button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <select 
          value={selectedLead} 
          onChange={handleLeadChange} 
          style={{ width: '600px', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
        >
          <option value="">-- Select a Lead --</option>
          {leads.map((lead, index) => (
            <option key={index} value={lead}>
              {lead}
            </option>
          ))}
        </select>
        <br />
        <button 
          onClick={fetchProjectsForLead} 
          style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Generate
        </button>

        {selectedLead && <h2 style={{ marginTop: '20px' }}>Selected Lead: {selectedLead}</h2>}
      </div>

      {/* Project Blocks */}
      {projects.length > 0 && projects.map((project, index) => (
        <ProjectBlock key={index} project={project} />
      ))}
    </div>
  );
}

export default App;
