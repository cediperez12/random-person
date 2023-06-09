import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('name')

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      const newTitle = person[newValue]

      setValue(newTitle)
      setTitle(newValue)
    }
  }

  const getUser = async () => {
    setLoading((p) => !p)
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]

    console.log(person)

    const { phone, email } = person
    const { large: image } = person.picture
    const { password } = person.login
    const { first, last } = person.name
    const { age } = person.dob
    const { number, name } = person.location.street

    const newPerson = {
      image,
      phone,
      email,
      password,
      first,
      last,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }

    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={person ? person.image : defaultImage}
            alt="random person"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" onClick={getUser}>
            {loading ? 'loading...' : 'Random User'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
