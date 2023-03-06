import { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../store'
import styles from './Pin.module.css'
import { post } from '../../api'
import img from './imgs/logo.png'

export function Pin() {
  // ** Hooks
  const history = useHistory()
  const { setOnBack, setOnCancel, setOnConfirm } = useStore()

  // ** States
  const [pin, setPin] = useState<string>('')

  const validatePin = useCallback(async () => {
    try {
      const { access_token } = await post('auth', {
        hash: window.localStorage.getItem('hash'),
        pin: parseInt(pin)
      })

      if (! access_token) {
        throw new Error()
      }

      window.localStorage.setItem('accessToken', access_token)

      history.push('/menu')
    } catch {
      alert('PIN Inválido')
    }
  }, [pin, history])

  const chandleChangePin = (character: string) => {
    if (pin.length >= 6) {
      return
    }

    setPin(pin => `${pin}${character}`)
  }

  const handleRemove = () => {
    setPin(pin => pin.substring(0, pin.length - 1))
  }

  useEffect(() => {
    setOnBack(null)
    setOnCancel(null)
    setOnConfirm(() => () => validatePin())
  }, [validatePin, setOnBack, setOnCancel, setOnConfirm])

  return (
    <main className={styles.main_content}>
      <div className={`d-flex flex-column`} style={{ width: 280, gap: 30 }}>
        <div style={{ textAlign: 'center' }}>
          <img src={img} width={100} alt='' />
        </div>
        <div className={`${styles.details} text-center`}>
          Digite o seu PIN
        </div>
        <div>
          <input
            type="password"
            className={styles.input}
            value={pin}
            readOnly
          />
        </div>
        <div className={`d-flex flex-column`} style={{ gap: 12 }}>
          <div className={`d-flex flex-row justify-content-between`}>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('0')}>
              0
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('1')}>
              1
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('2')}>
              2
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('3')}>
              3
            </button>
          </div>
          <div className={`d-flex flex-row justify-content-between`}>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('4')}>
              4
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('5')}>
              5
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('6')}>
              6
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('7')}>
              7
            </button>
          </div>
          <div className={`d-flex flex-row justify-content-between`}>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('8')}>
              8
            </button>
            <button className={`${styles.button}`} onClick={() => chandleChangePin('9')}>
              9
            </button>
            <button className={`${styles.button}`}>
              .
            </button>
            <button className={`${styles.button}`} onClick={handleRemove}>
              X
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
