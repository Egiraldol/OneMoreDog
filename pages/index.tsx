import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import DoCard from '../components/cards'
import styles from '../styles/index.module.scss'
import Select from '../components/select'
import getDog from '../helpers/getDog'

const initialDog = {
  photo: '',
  breed: {
    id: '',
    name: ''
  }
}

function Index (): React.JSX.Element {
  const [filterDog, setFilterDog] = useState(initialDog)
  const [breed, setBreed] = useState(null)

  useEffect(() => {
    updateDog()
  }, [filterDog])

  const updateDog = (breedId): void => {
    console.log('breedId1', breedId)
    if (breedId !== undefined) {
      console.log('breedId', breedId)
      getDog(breedId, true)
        .then((newDog) => {
          setFilterDog(newDog)
          setBreed(newDog.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  console.log('breed', breed)
  console.log('filterDog', filterDog)
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.cardContainer}>
        <DoCard id = {null}/>
        <DoCard id = {null}/>
        <DoCard id = {null}/>
        <DoCard id = {null}/>
      </div>
      <div className={styles.selectContainer}>
        <Select updateDog={updateDog}/>
        {(breed !== null && filterDog !== undefined && filterDog.length !== 0) && <DoCard id = {filterDog[0].id} doggo={filterDog[0]} callback={updateDog}/>}
      </div>
    </div>
  )
}

export default Index
