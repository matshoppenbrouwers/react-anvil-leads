import React, { useEffect } from 'react';

// Updated ProgressBar component
const ProgressBar = ({ usedDays, budgetedDays }) => {
  const isOverBudget = usedDays > budgetedDays;
  const progressPercentage = isOverBudget ? 100 : (usedDays / budgetedDays) * 100;
  const overBudgetPercentage = isOverBudget ? ((usedDays - budgetedDays) / budgetedDays) * 100 : 0;

  const barStyle = {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: '10px', // Thinner bar
    borderRadius: '5px',
    position: 'relative',
    overflow: 'hidden',
  };

  const progressStyle = {
    width: `${progressPercentage}%`,
    backgroundColor: '#333', // Dark grey
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  const overBudgetStyle = {
    width: `${overBudgetPercentage}%`,
    backgroundColor: '#b22222', // Dark red for over-budget
    height: '100%',
    position: 'absolute',
    top: '0',
    right: '0',
  };

  return (
    <div style={barStyle}>
      <div style={progressStyle}></div>
      {isOverBudget && <div style={overBudgetStyle}></div>}
    </div>
  );
};

function ProjectBlock({ project }) {
  const team = project.team || [];

  useEffect(() => {
    console.log('Project Data:', project);
  }, [project]);

  return (
    <div className="project-block" style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px' }}>
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
