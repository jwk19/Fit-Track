import React from 'react'

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <div className="card">
        <h3>Quick Stats</h3>
        <p>Workouts this week: 3</p>
        <p>Active goals: 2</p>
        <p>Fitness groups: 1</p>
      </div>
      <div className="card">
        <h3>Recent Activity</h3>
        <ul>
          <li>Completed a 5k run</li>
          <li>Joined "Weight Loss Challenge" group</li>
          <li>Set a new goal: "Bench press 200 lbs"</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard