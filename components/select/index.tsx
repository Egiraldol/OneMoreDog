import React, { useEffect, useState } from 'react'
import getBreeds from '../../helpers/getBreed'
import styles from '../../styles/select.module.scss'

const initialBreeds = [
  {
    id: 1,
    name: 'boxer'
  },
  {
    id: 2,
    name: 'husky'
  }
]

const Select = ({ updateDog }) => {
  const [breeds, setBreeds] = useState(initialBreeds)

  useEffect(() => {
    updateBreeds()
  }, [])

  const updateBreeds = () => {
    getBreeds()
      .then((newBreeds) => {
        setBreeds(newBreeds)
      })
  }

  return (
    <div className={styles.Select}>
      <select onChange={(e) => updateDog(e.target.value)}>
            {breeds.map(breed => (
                <option value={breed.id} key={breed.id}>
                    {breed.name}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Select
