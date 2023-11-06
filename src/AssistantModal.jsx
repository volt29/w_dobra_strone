
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

  const handleLinkClick = (taskId) => {
    handleTaskCompletion(taskId);
    viewDocument(tasks[1].link);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    handleTaskCompletion(3); // Simulate marking the 'Add new record' task as completed
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} style={{ right: isOpen ? '0' : '-100%' }}>
      <button className="close-button" onClick={toggleModal}>X</button>
      <h2>Onboarding dodawania rekordów do plików produkcyjnych</h2>
      <p>Poniżej znajduje się lista zadań, która pomoże Ci efektywnie pracować z plikami produkcyjnymi.</p>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <label>
              <input type="checkbox" checked={task.completed} onChange={() => handleTaskCompletion(task.id)} />
              {task.title}
              {task.link && <a href="#" onClick={() => handleLinkClick(task.id)}> (przejdź)</a>}
            </label>
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
