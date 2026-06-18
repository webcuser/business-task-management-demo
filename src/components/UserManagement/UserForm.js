import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ onAddUser, onEditUser, editingUser, setEditingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    const user = { id: editingUser ? editingUser.id : undefined, name, email };
    if (editingUser) {
      onEditUser(user);
    } else {
      onAddUser(user);
    }
    setEditingUser(null);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      {editingUser && <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>}
    </form>
  );
};

export default UserForm;
