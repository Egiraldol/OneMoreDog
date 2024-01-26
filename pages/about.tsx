import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import getDog from '../helpers/getDog'
import styles from '../styles/about.module.scss'

const About: React.FC = () => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    updateDog()
  }, [])

  const updateDog = () => {
    getDog()
      .then((newDog) => {
        setImage(newDog[0].url)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={styles.About}>
      <Header />
      <div className={styles.container}>
        {image && <img src={image} alt="Dog" style={{ maxWidth: '100%', height: 'auto' }} />}
      </div>
      <div className="text-container">
        <h2>Sobre Nosotros</h2>
        <p>
          Bienvenido a nuestro espacio colaborativo, donde la pasión por el conocimiento y la creatividad se entrelazan.
          Nosotros, en OneMoreDog, estamos comprometidos con la idea de construir un entorno donde las ideas florezcan y
          la innovación sea el resultado natural de la colaboración.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>

        <p>
          Queremos construir un espacio donde cada contribución cuente, ya sea a través de conocimientos, ideas, o el
          simple acto de compartir. Nuestra comunidad está abierta a todos los que deseen formar parte y aportar su
          creatividad única.
        </p>

        <p>
          Únete a nosotros en esta emocionante jornada hacia el descubrimiento y la colaboración. ¡Esperamos con
          entusiasmo conocer más sobre ti y tu pasión por hacer una diferencia!
        </p>
      </div>
    </div>
  )
}

export default About
