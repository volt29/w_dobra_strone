import React, { useState } from 'react';
import './AssistantModal.css';

const AssistantModal = ({ isOpen, toggleModal, viewDocument }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Zapoznaj się z dokumentem', completed: true },
    { id: 2, title: 'Przejdź do dokumentu i zapoznaj się z nim', completed: false, link: 'https://docs.google.com/spreadsheets/d/1oxAj92AKSI1Qz1nT-Up78b_qa-ezux2--MD0T_xPZfU/edit?usp=sharing' },
    { id: 3, title: 'Dodaj nowy rekord', completed: false }
  ]);
  const [formData, setFormData] = useState({ name: '', value: '' });

  const handleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleLinkClick = (taskId, event) => {
    event.preventDefault();
    event.stopPropagation();
    const task = tasks.find(task => task.id === taskId);
    if (task && !task.completed) {
      handleTaskCompletion(taskId);
    }
    viewDocument(task.link);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    // Simulate marking the 'Add new record' task as completed
    handleTaskCompletion(3);
  };

  // Logika do zmiany wyglądu zaznaczonego zadania
  const getTaskItemStyle = (completed) => ({
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? 'grey' : 'black',
  });

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} style={{ right: isOpen ? '0' : '-100%' }}>
      <button className="close-button" onClick={toggleModal}>X</button>
      <h2>Onboarding dodawania rekordów do plików produkcyjnych</h2>
      <p>Poniżej znajduje się lista zadań, która pomoże Ci efektywnie pracować z plikami produkcyjnymi.</p>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <div>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)}
              />
              <label htmlFor={`task-${task.id}`} style={getTaskItemStyle(task.completed)}>
                {task.title}
              </label>
            </div>
            {task.link && task.id === 2 && (
              <div className="link-button-container">
                <button onClick={(event) => handleLinkClick(task.id, event)} className="link-button">Przejdź do dokumentu</button>
              </div>
            )}
            {task.id === 3 && !task.completed && (
              <form onSubmit={handleSubmit}>
                <label>
                  Nazwa:
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </label>
                <label>
                  Wartość:
                  <input type="text" name="value" value={formData.value} onChange={handleInputChange} required />
                </label>
                <button type="submit">Dodaj rekord</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantModal;
