import styles from './ActionButtons.module.css'
import { useStore } from '../../store'

export const ActionsButtonRight = () => {
  // ** Hooks
  const { onConfirm, onBack } = useStore()

  const handleConfirm = () => {
    onConfirm?.()
  }

  const handleBack = () => {
    onBack?.()
  }

  return (
    <ul className={styles.screen_action_buttons}>
      <li className={`${styles.screen_action_buttons_item} ${onConfirm === null ? styles.disabled : ''}`} style={{ backgroundColor: '#32BEA6' }} onClick={handleConfirm}>
        Confirmar
      </li>
      <li className={`${styles.screen_action_buttons_item} ${onBack === null ? styles.disabled : ''}`} style={{ backgroundColor: '#E5DE25' }} onClick={handleBack}>
        Voltar
      </li>
      <li className={styles.screen_action_buttons_item} style={{ backgroundColor: '#ADADAD' }}>
      </li>
      <li className={styles.screen_action_buttons_item} style={{ backgroundColor: '#ADADAD' }}>
      </li>
    </ul>
  );
}
