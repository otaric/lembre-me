import { useReducer, useState, useEffect } from 'react'
import Form from './components/Form'
import Task from './components/Task'
import IAction from './interfaces/IAction'
import ITask from './interfaces/ITask'
import styles from './styles/main.module.css'
import classNames from 'classnames'

export enum ACTIONS {
  ADD_TASK = 'add-task',
  TOGGLE_TASK = 'toggle-task',
  DELETE_TASK = 'delete-task'
}

function reducer(tasks: ITask[], action: IAction) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      if (action.payload.title === '') return tasks
      if (action.payload.description === '') {
        return [...tasks, newTask(action.payload.title, `sem descrição`)]
      }
      return [
        ...tasks,
        newTask(action.payload.title, action.payload.description)
      ]

    case ACTIONS.TOGGLE_TASK:
      return tasks.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })

    case ACTIONS.DELETE_TASK:
      return tasks.filter(task => task.id !== action.payload.id)

    default:
      return tasks
  }
}

function newTask(title: string | undefined, description: string | undefined) {
  return {
    id: Date.now(),
    title: title,
    description: description,
    date: new Date().toLocaleDateString('pt-BR'),
    hour: new Date().toLocaleTimeString('pt-BR').slice(0, 5),
    complete: false
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(
    reducer,
    [],
    initial => JSON.parse(localStorage.getItem('USER_TASKS') || '[]') || initial
  )
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: { title: title, description: description }
    })
    setTitle('')
    setDescription('')
  }

  useEffect(() => {
    localStorage.setItem('USER_TASKS', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className={styles.top}>
        <h1 className={styles.title}>TASKS</h1>
        <div className={styles.form_container}>
          <Form
            onSubmit={handleSubmit}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        </div>
      </div>

      <div className={styles.tasks}>
        <span
          className={classNames({
            [styles.no_tasks]: true,
            [styles.hidden]: tasks.length > 0
          })}
        >
          no tasks
        </span>

        {tasks.map((task: ITask) => {
          return <Task key={task.id} task={task} dispatch={dispatch} />
        })}
      </div>
    </>
  )
}
