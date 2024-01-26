import React, { useState } from 'react'
import styles from '../../styles/simpleForm.module.scss'

interface FormData {
  title: string
  body: string
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

const SimpleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: ''
  })
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setSubmittedData(data)
      setSuccessMessage('You will now recieve information to your mail!')
    } catch (error) {
      console.error(error)
      setSuccessMessage(null)
    }
  }

  return (
    <div className={styles.SimpleForm}>
      <form onSubmit={handleSubmit}>
        <label>
          UserName:
          <input type="text" name="userName" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.body} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {successMessage && (
        <div className={styles.success_message}>
          <strong>{successMessage}</strong>
        </div>
      )}
    </div>
  )
}

export default SimpleForm
