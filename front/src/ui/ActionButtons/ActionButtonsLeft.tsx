import styles from './ActionButtons.module.css'
import { useStore } from '../../store'

export const ActionsButtonLeft = () => {
  // ** Hooks
  const { onCancel } = useStore()

  const handleCancel = () => {
    onCancel?.()
  }

  return (
    <ul className={styles.screen_action_buttons}>
      <li className={`${styles.screen_action_buttons_item} ${onCancel === null ? styles.disabled : ''}`} style={{ backgroundColor: 'red' }} onClick={handleCancel}>
        Cancelar
      </li>
      <li className={styles.screen_action_buttons_item} style={{ backgroundColor: '#ADADAD' }}>
      </li>
      <li className={styles.screen_action_buttons_item} style={{ backgroundColor: '#ADADAD' }}>
      </li>
      <li className={styles.screen_action_buttons_item} style={{ backgroundColor: '#ADADAD' }}>
      </li>
    </ul>
  );
}
