import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'



const initialForm = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    
}

const UpdateForm = ({movieList, setMovieList}) => {

    const [movie, setMovie] = useState(initialForm)
    
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovie(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[id])

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
            
        })
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res)
                // if id of movie matches movie in movie list - replace that movie
                setMovieList(movieList.map(film => {
                    if (film.id === id) {
                        return movie
                    } else {
                        return film
                    }
                }))
                history.push("/")

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Update Form</h2>
                <label>
                    <input
                    type='text'
                    name='title'
                    placeholder='Enter title ...'
                    value={movie.title}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    <input
                    type='text'
                    name='director'
                    placeholder='Enter director name ...'
                    value={movie.director}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    <input
                    type='number'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                    />
                </label>

                <button>Update</button>

            </form>
        </div>
    )
}


export default UpdateForm;