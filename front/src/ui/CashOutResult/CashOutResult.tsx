import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../store'
import { post } from '../../api'
import styles from './CashOutResult.module.css'
import img from './imgs/cash.jpeg'

export const CashOutResult = () => {
  // ** Hooks
  const history = useHistory()
  const { setOnBack, setOnCancel, setOnConfirm } = useStore()

  // ** States
  const [amount, setAmount] = useState<string>('')

  const withdraw = JSON.parse(window.localStorage.getItem('withdraw') ?? '') as any
  console.log(withdraw)
  const note = JSON.parse(window.localStorage.getItem('note') ?? '') as any

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
      const notes = await post('cashout', {
        amount: amount
      })

      history.push('/cash-out/result')
    } catch(error) {
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
            Saque realizado com sucesso
          </div>
          <div className='d-flex flex-column' style={{ width: 500, gap: 20, marginTop: 20 }}>
            {Object.keys(withdraw).map(value => (
              <div>
                <div key={value} className='d-flex align-items-center justify-content-center' style={{ backgroundColor: '#D9D9D9', width: 100, height: 60, fontWeight: 'bold' }}>
                  {`${value}X`}
                </div>
                <div style={{ marginTop: 10 }}>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/4/4f/1_Brazil_real_First_Obverse_01.jpg' style={{ maxWidth: 100 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
