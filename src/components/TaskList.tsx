import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle.length !== 0) {
      const task: Task = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false
      };
      setTasks([...tasks, task]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete
        }
      }
      else {
        return task;
      }
    })
    setTasks(updatedTasks);

    //SOLUÇÃO ANTERIOR (não preserva a ordem dos elementos)
    // const notCompletedTasks = tasks.filter(task => task.id !== id);
    // const completedTask = tasks.filter(task => task.id === id);
    // completedTask[0].isComplete = !completedTask[0].isComplete;
    // setTasks([...notCompletedTasks, completedTask[0]]);
  }
  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}