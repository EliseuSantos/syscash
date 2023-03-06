import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../store'
import styles from './Menu.module.css'
import imgCash from './imgs/cash.jpeg'
import imgDeposit from './imgs/deposit.jpeg'
import imgTransfer from './imgs/transfer.jpeg'

export function Menu() {
  // ** Hooks
  const history = useHistory()
  const { setOnBack, setOnCancel, setOnConfirm } = useStore()

  const onClickCash = () => {
    history.push('/cash-out')
  }

  useEffect(() => {
    setOnBack(() => () => history.push('/pin-check'))
    setOnCancel(() => () => history.push('/'))
    setOnConfirm(null)
  }, [setOnBack, setOnCancel, setOnConfirm, history])

  return (
    <main className='d-flex flex-column align-items-center justify-content-center h-100'>
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
      <div className={`${styles.content} d-flex flex-column align-items-center justify-content-center`} style={{ gap: 40 }}>
        <div className={styles.details}>
          O que você gostaria de fazer hoje?
        </div>
        <div className='d-flex flex-row' style={{ gap: 20 }}>
          <div>
            <div className="d-flex flex-column text-center" onClick={onClickCash}>
              <img src={imgCash} className={styles.button} alt='' />
              <div className={styles.text}>
                Sacar
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex flex-column text-center">
              <img src={imgDeposit} className={`${styles.button} ${styles.disabled}`} alt='' />
              <div className={styles.text}>
                Depositar
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex flex-column text-center">
              <img src={imgTransfer} className={`${styles.button} ${styles.disabled}`} alt='' />
              <div className={styles.text}>
                Transferir
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
