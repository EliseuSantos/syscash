import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../store'
import { post } from '../../api'
import styles from './CashOut.module.css'
import img from './imgs/cash.jpeg'

export const CashOut = () => {
  // ** Hooks
  const history = useHistory()
  const { setOnBack, setOnCancel, setOnConfirm } = useStore()

  // ** States
  const [amount, setAmount] = useState<string>('')

  const chandleChangeAmount = (character: string) => {
    setAmount(amount => `${amount}${character}`)
  }

  const handleRemove = () => {
    setAmount(amount => amount.substring(0, amount.length - 1))
  }

  const confirm = useCallback(async () => {
    if (amount.length === 0) {
      alert('Informe o valor do saque')

      return
    }

    try {
      const { withdraw, note } = await post('cashouts', {
        amount: parseInt(amount)
      })

      if (! withdraw) {
        throw new Error()
      }

      window.localStorage.setItem('withdraw', JSON.stringify(withdraw))
      window.localStorage.setItem('note', JSON.stringify(note))

      history.push('/cash-out/result')
    } catch {
      alert('Notas Insuficientes')
    }
  }, [amount, history])

  useEffect(() => {
    setOnBack(() => () => history.push('/menu'))
    setOnCancel(() => () => history.push('/'))
    setOnConfirm(() => () => confirm())
  }, [setOnBack, setOnCancel, setOnConfirm, confirm, history])

  return (
    <main className={`d-flex flex-column align-items-center justify-content-center h-100`}>
      <div className={styles.header}>
        <div className="d-flex align-items-center justify-content-center h-100" style={{ padding: '0 100px' }}>
          <div style={{ flex: 1, textAlign: 'left', fontSize: 30, fontWeight: 'bold', color: '#3C3F45' }}>
            John Wilker Goes
          </div>
          <div style={{ flex: 1, textAlign: 'right', fontSize: 30, color: '#FFFFFF' }}>
            22 Agosto/2023
          </div>
        </div>
      </div>
      <div className={`${styles.content} d-flex flex-column align-items-center justify-content-center`} style={{ gap: 20 }}>
        <div className={`d-flex flex-column align-items-center`} style={{ width: 500, gap: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <img src={img} alt='' width={100} />
          </div>
          <div className={`${styles.details} text-center`}>
            Quanto você quer sacar?
          </div>
          <div className='d-flex flex-column' style={{ width: 300, gap: 20 }}>
            <div>
              <input
                type="text"
                className={styles.input}
                value={amount}
                readOnly
              />
            </div>
            <div className={`d-flex flex-column`} style={{ gap: 12 }}>
              <div className={`d-flex flex-row justify-content-between`}>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('0')}>
                  0
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('1')}>
                  1
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('2')}>
                  2
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('3')}>
                  3
                </button>
              </div>
              <div className={`d-flex flex-row justify-content-between`}>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('4')}>
                  4
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('5')}>
                  5
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('6')}>
                  6
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('7')}>
                  7
                </button>
              </div>
              <div className={`d-flex flex-row justify-content-between`}>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('8')}>
                  8
                </button>
                <button className={`${styles.button}`} onClick={() => chandleChangeAmount('9')}>
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
        </div>
      </div>
    </main>
  );
}
