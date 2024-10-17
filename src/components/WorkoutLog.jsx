import React, { useState } from 'react'

const WorkoutLog = ({ user }) => {
  const [workouts, setWorkouts] = useState([])
  const [newWorkout, setNewWorkout] = useState({ type: '', duration: '', notes: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewWorkout({ ...newWorkout, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setWorkouts([...workouts, { ...newWorkout, id: Date.now() }])
    setNewWorkout({ type: '', duration: '', notes: '' })
  }

  return (
    <div className="workout-log">
      <h2>Workout Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="type"
          value={newWorkout.type}
          onChange={handleInputChange}
          placeholder="Workout type"
          required
        />
        <input
          type="number"
          name="duration"
          value={newWorkout.duration}
          onChange={handleInputChange}
          placeholder="Duration (minutes)"
          required
        />
        <textarea
          name="notes"
          value={newWorkout.notes}
          onChange={handleInputChange}
          placeholder="Notes"
        ></textarea>
        <button type="submit">Log Workout</button>
      </form>
      <div className="workout-list">
        <h3>Recent Workouts</h3>
        {workouts.map((workout) => (
          <div key={workout.id} className="card">
            <h4>{workout.type}</h4>
            <p>Duration: {workout.duration} minutes</p>
            <p>Notes: {workout.notes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutLog