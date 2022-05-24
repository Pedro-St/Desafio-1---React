import { useState } from 'react'

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
    if (!newTaskTitle) {  // if negando para que eu n possa criar um task sem nome 
      return;
    }
    //Criando a nova task, como objeto
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false // começa com falso para não adicionar uma que ja foi completa
    }
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle(''); // Isso reseta automaticamento o input assim que eu crio a task nova

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
   
    const completeTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(completeTask);

    //setTimeout adicionado para as tasks se apagarem sozinha quando completadas depois de um tempo
    setTimeout(() => { 
      const deleteTest = tasks.filter(
        task => task.id !== id);

        setTasks(deleteTest);
      }, 60000)
      
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const deletedTask = tasks.filter(
      task => task.id !== id);

    setTasks(deletedTask)
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
            <FiCheckSquare size={16} color="#fff"/>
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
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}