import React, { useEffect } from 'react';

// Updated ProgressBar component
const ProgressBar = ({ usedDays, budgetedDays }) => {
  const isOverBudget = usedDays > budgetedDays;
  const progressPercentage = (usedDays / budgetedDays) * 100;

  const barStyle = {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: '10px',
    borderRadius: '5px',
    position: 'relative',
    overflow: 'hidden',
  };

  const progressStyle = {
    width: `${progressPercentage > 100 ? 100 : progressPercentage}%`,
    backgroundColor: isOverBudget ? '#b22222' : '#333', // Red if over-budget, dark grey otherwise
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  return (
    <div style={barStyle}>
      <div style={progressStyle}></div>
    </div>
  );
};

function ProjectBlock({ project }) {
  const team = project.team || [];

  useEffect(() => {
    console.log('Project Data:', project);
  }, [project]);

  return (
    <div
      className="project-block"
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        backgroundColor: '#fff', // White background for the project container
        borderRadius: '10px', // Rounded borders
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: slight shadow to add depth
      }}
    >
      {/* Display projectID in Project Overview */}
      <h2>{`Project Overview: ${project.projectID}`}</h2>

      {/* Project Overview */}
      <div className="project-overview">
        <p>Days: {project.daysUsedTotal} / {project.daysBudgetedTotal}</p>
        <ProgressBar usedDays={project.daysUsedTotal} budgetedDays={project.daysBudgetedTotal} />
      </div>

      {/* Team Resourcing */}
      <div className="team-resourcing">
        <p><strong>Team Resourcing</strong></p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Budgeted Days</th>
              <th>Used Days</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.budgetedDays}</td>
                <td>{member.usedDays}</td>
                <td>
                  <ProgressBar usedDays={member.usedDays} budgetedDays={member.budgetedDays} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectBlock;
