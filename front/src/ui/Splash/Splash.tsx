import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from '../../store'
import styles from './Splash.module.css'
import logo from './imgs/logo.png'

export const Splash = () => {
  // ** Hooks
  const history = useHistory()
  const { setOnBack, setOnCancel, setOnConfirm } = useStore()

  useEffect(() => {
    setOnBack(null)
    setOnCancel(null)
    setOnConfirm(null)

    window.setTimeout(() => {
      history.push('/finger-check')
    }, 3000)
  }, [history, setOnBack, setOnCancel, setOnConfirm])

  return (
    <main className={styles.splash_content}>
      <img src={logo} width={173} alt='' />
    </main>
  )
}
