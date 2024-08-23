"use client"

import Header from "app/app/components/header/header"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import './style.css'

function CreateLicence() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [letter, setLetter] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newLicence = { name, description, letter }

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/licences/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(newLicence)
            })

            if (res.ok) {
                router.push('/licences')
            } else {
                const errorData = await res.json()
                setError(errorData.message || "Error al crear la licencia")
            }
        } catch (err) {
            setError("Error en la solicitud")
        }
    }

    const getCookie = (name) => {
        let value = "; " + document.cookie
        let parts = value.split("; " + name + "=")
        if (parts.length === 2) return parts.pop().split(";").shift()
    }

    return (
        <div>
            <Header />
            <button onClick={() => router.push('/licences')} className="back-button">← Regresar</button>
            <div className="create-licence-container">
                <h1>Agregar Nueva Licencia</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="letter">Letra:</label>
                        <input
                            type="text"
                            id="letter"
                            value={letter}
                            onChange={(e) => setLetter(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="back-button">Agregar Licencia</button>
                </form>
            </div>
        </div>
    )
}

export default CreateLicence
