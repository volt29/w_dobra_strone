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

  const handleLinkClick = (link, event) => {
    event.preventDefault(); // Zapobiegnij domyślnej akcji linka
    viewDocument(link);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    // Ustawienie zadania jako ukończone powinno być wykonane po potwierdzeniu dodania rekordu
    // Możesz to zrobić poprzez wywołanie odpowiedniej funkcji API tutaj
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} style={{ right: isOpen ? '0' : '-100%', fontFamily: 'Lato, sans-serif' }}>
      <button className="close-button" onClick={toggleModal}>X</button>
      <h2 style={{ fontFamily: 'Lato, sans-serif' }}>Onboarding dodawania rekordów do plików produkcyjnych</h2>
      <p style={{ fontFamily: 'Lato, sans-serif' }}>Poniżej znajduje się lista zadań, która pomoże Ci efektywnie pracować z plikami produkcyjnymi.</p>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', width: '100%', marginBottom: '5px' }}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor={`task-${task.id}`} style={{ flexGrow: 1, fontFamily: 'Lato, sans-serif' }}>{task.title}</label>
            </div>
            {task.link && task.id === 2 && (
              <button onClick={(event) => handleLinkClick(task.link, event)} className="link-button" style={{ fontSize: '90%' }}>Przejdź do dokumentu</button>
            )}
            {task.id === 3 && !task.completed && (
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '5px', width: '100%' }}>
                  <label style={{ width: '100%' }}>
                    Nazwa:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%' }} />
                  </label>
                </div>
                <div style={{ marginBottom: '5px', width: '100%' }}>
                  <label style={{ width: '100%' }}>
                    Wartość:
                    <input type="text" name="value" value={formData.value} onChange={handleInputChange} required style={{ width: '100%' }} />
                  </label>
                </div>
                <button type="submit" style={{ width: '100%' }}>Dodaj rekord</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantModal;
