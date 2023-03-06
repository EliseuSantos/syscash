import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../store'
import styles from './Finger.module.css'
import img from './imgs/fingerprint.png'
import { post } from '../../api'

export const Finger = () => {
  // ** Hooks
  const history = useHistory()
  const { setOnBack, setOnCancel, setOnConfirm } = useStore()

  const authenticate = useCallback(async () => {
    try {
      const { hash } = await post('auth/finger-check', {
        finger_hash: '23458724952476527645769245'
      })

      window.localStorage.setItem('hash', hash)

      history.push('/pin-check')
    } catch(error) {
      console.log('error', error)
    }
  }, [history])

  useEffect(() => {
    setOnBack(null)
    setOnCancel(null)
    setOnConfirm(null)

    window.setTimeout(() => {
      authenticate()
    }, 3000)
  }, [authenticate, setOnBack, setOnCancel, setOnConfirm])

  return (
    <main className={styles.main_content}>
      <img src={img} width={173} alt='' />
    </main>
  )
}
