// src/ProjectBlock.js
import React from 'react';

function ProjectBlock({ project }) {
  return (
    <div className="project-block">
      <h2>{project.ProjectName}</h2>

      {/* Project Overview */}
      <div className="project-overview">
        <p><strong>Project Overview</strong></p>
        <p>Days: {project.DaysUsedTotal} / {project.DaysBudgetedTotal}</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(project.DaysUsedTotal / project.DaysBudgetedTotal) * 100}%` }}
          />
        </div>
      </div>

      {/* Team Resourcing */}
      <div className="team-resourcing">
        <p><strong>Team Resourcing</strong></p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Allocated Days</th>
              <th>Used Days</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {project.team.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.budgetedDays}</td>
                <td>{member.usedDays}</td>
                <td className="progress-cell">
                  <div className="small-progress-bar">
                    <div
                      className="small-progress-fill"
                      style={{ width: `${(member.usedDays / member.budgetedDays) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoices */}
      {project.invoices && project.invoices.length > 0 && (
        <div className="invoices">
          <p><strong>Invoices</strong></p>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {project.invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceID}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><strong>Projected Expenses: ${project.invoices.reduce((sum, invoice) => sum + invoice.amount, 0)}</strong></p>
        </div>
      )}
    </div>
  );
}

export default ProjectBlock;
