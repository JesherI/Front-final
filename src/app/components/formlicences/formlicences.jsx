"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "./formlicences.css"
function Formlicences() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, description)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/licences/`, {
            method: "POST",
            body: JSON.stringify({ name, description }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        router.refresh()
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" className="name"
                    onChange={e => setName(e.target.value)} placeholder="Tipo"/>
                <textarea name="description" className="description"
                    onChange={e => setDescription(e.target.value)} placeholder="Descripción">
                </textarea>
                <button>Save</button>
            </form>
        </div>
    )
}

export default Formlicences
