import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const initialForm = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const AddMovie = ({movieList, setMovieList}) => {

    const [newMovie, setNewMovie] = useState(initialForm)
    const history = useHistory()

    const handleChange = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post("http://localhost:5000/api/movies", newMovie)
            .then(res => {
                console.log(res)
                setMovieList(res.data)
                history.push("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <h3>Add a New Movie to the List!!</h3>
            <form onSubmit={handleSubmit}>
                <label> Movie Title:
                    <input
                    type='text'
                    name='title'
                    value={newMovie.title}
                    placeholder='Enter title ...'
                    onChange={handleChange}
                    />
                </label>

                <label> Director
                    <input
                    type='text'
                    name='director'
                    value={newMovie.director}
                    placeholder='Enter director ...'
                    onChange={handleChange}
                    />
                </label>

                <label> Metascore 
                    <input
                    type='number'
                    name='metascore'
                    value={newMovie.metascore}
                    onChange={handleChange}
                    />
                </label>
                <button>Add Movie</button>
            </form>
        </div>

    )
}

export default AddMovie;