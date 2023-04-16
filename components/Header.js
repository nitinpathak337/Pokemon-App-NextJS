
import Link from 'next/link'
import React from 'react'
import styles from '../styles/header.module.css'


//Header Component of the app
const Header = () => {
  return (
    <div className='bg-warning py-4 d-flex flex-row align-items-center justify-content-around text-white'>
      <h1 >Pokemon App</h1>
      <div className='d-flex flex-row justify-content-around w-50'>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="#" className={styles.link}>Video Games & App</Link>
        <Link href="#" className={styles.link}>Trading Card Game</Link>
        <Link href="#" className={styles.link}>Pokemon TV</Link>
        <Link href="#" className={styles.link}>News</Link>
      </div>
    </div>
  )
}

export default Header
