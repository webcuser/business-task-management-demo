import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleAddUser = async (user) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  const handleEditUser = async (user) => {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      fetchUsers();
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    if (response.ok) {
      fetchUsers();
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="user-list">
      <h2>User Management</h2>
      <UserForm 
        onAddUser={handleAddUser} 
        onEditUser={handleEditUser} 
        editingUser={editingUser} 
        setEditingUser={setEditingUser} 
      />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} 
            <button onClick={() => handleEditClick(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
