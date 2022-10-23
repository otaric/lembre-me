import React from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked, ImBin } from 'react-icons/im'
import { ACTIONS } from '../App'
import IAction from '../interfaces/IAction'
import ITask from '../interfaces/ITask'
import styles from '../styles/task.module.css'
import classNames from 'classnames'


interface Props {
  task: ITask
  dispatch: React.Dispatch<IAction>
}

export default function Todo({ task, dispatch }: Props) {
  return (
    <div className={styles.info_container}>
      <span
        className={`${styles.button} ${styles.button_checked}`}
        title={task.complete ? `uncheck` : `check`}
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id: task.id } })
        }
      >
        {task.complete ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      </span>
      <div
        className={classNames({
          [styles.task_info]: true,
          [styles.incomplete]: !task.complete,
          [styles.complete]: task.complete
        })}
      >
        <div className={styles.info}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>
        <div className={styles.date}>
          <p>{task.date}</p>
          <p>{task.hour}</p>
        </div>
      </div>

      <span
        className={`${styles.button} ${styles.button_delete}`}
        title="delete"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TASK, payload: { id: task.id } })
        }
      >
        <ImBin />
      </span>
    </div>
  )
}
