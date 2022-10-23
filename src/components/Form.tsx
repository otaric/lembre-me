import styles from "../styles/form.module.css"

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

export default function Form({
  onSubmit,
  title,
  setTitle,
  description,
  setDescription
}: Props) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        <span>title</span>
        <input
          className={`${styles.text} ${styles.input_title}`}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        <span>description</span>
        <textarea
          className={`${styles.text} ${styles.description}`}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <button className={styles.button} type="submit">
        add
      </button>
    </form>
  )
}