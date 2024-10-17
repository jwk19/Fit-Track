import React, { useState } from 'react'

const FitnessGroups = ({ user }) => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Weight Loss Challenge', members: 15, description: 'Join us for a 30-day weight loss challenge!' },
    { id: 2, name: 'Marathon Training', members: 8, description: 'Prepare for the upcoming city marathon together.' },
  ])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [comment, setComment] = useState('')

  const handleJoinGroup = (groupId) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, members: group.members + 1 } : group
    ))
  }

  const handleSelectGroup = (group) => {
    setSelectedGroup(group)
    setComment('')
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    // In a real app, you would send this comment to a backend
    console.log(`New comment in group ${selectedGroup.id}: ${comment}`)
    setComment('')
  }

  return (
    <div className="fitness-groups">
      <h2>Fitness Groups</h2>
      <div className="group-list">
        {groups.map((group) => (
          <div key={group.id} className="card">
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <p>Members: {group.members}</p>
            <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
            <button onClick={() => handleSelectGroup(group)}>View Details</button>
          </div>
        ))}
      </div>
      {selectedGroup && (
        <div className="group-details">
          <h3>{selectedGroup.name} - Discussion</h3>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              required
            ></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FitnessGroups