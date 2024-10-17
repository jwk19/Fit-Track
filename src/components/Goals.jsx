import React, { useState } from 'react'

const Goals = ({ user }) => {
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewGoal({ ...newGoal, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGoals([...goals, { ...newGoal, id: Date.now(), completed: false }])
    setNewGoal({ title: '', description: '', targetDate: '' })
  }

  const toggleGoalCompletion = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  return (
    <div className="goals">
      <h2>Fitness Goals</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newGoal.title}
          onChange={handleInputChange}
          placeholder="Goal title"
          required
        />
        <textarea
          name="description"
          value={newGoal.description}
          onChange={handleInputChange}
          placeholder="Goal description"
          required
        ></textarea>
        <input
          type="date"
          name="targetDate"
          value={newGoal.targetDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Goal</button>
      </form>
      <div className="goal-list">
        <h3>Your Goals</h3>
        {goals.map((goal) => (
          <div key={goal.id} className={`card ${goal.completed ? 'completed' : ''}`}>
            <h4>{goal.title}</h4>
            <p>{goal.description}</p>
            <p>Target Date: {goal.targetDate}</p>
            <button onClick={() => toggleGoalCompletion(goal.id)}>
              {goal.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Goals