import React from 'react'
import Header from '../components/header'
import SimpleForm from '../components/simpleForm'
import styles from '../styles/title.module.scss'

const Contact: React.FC = () => {
  return (
    <div>
      <Header/>
      <div className={styles.Contact}>
        <h2>
          Would you like to recieve more information to your Mail?
        </h2>
      </div>
      <SimpleForm />
    </div>
  )
}

export default Contact
