import React, { useEffect, useState } from 'react'
import { type NextPage } from 'next'
import Header from '../components/header'
import DoCard from '../components/cards'
import styles from '../styles/index.module.scss'

const Index: NextPage = () => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.cardContainer}>
        <DoCard />
        <DoCard />
        <DoCard />
      </div>
    </div>
  )
}

export default Index
