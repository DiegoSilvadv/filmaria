import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './home.css';

export default function Home(){

    const [movies, setMovies ] = useState([]);

    useEffect(()=>{
        async function loadFilmes() {
           const response = await api.get('r-api/?api=filmes')
            setMovies(response.data); 
        }

        loadFilmes();
    }, [])

    return(
        <div className="conatainer">
            <div className="film-list">
                {
                    movies.map((movie)=>{
                        return (
                            <article key={movie.id}>
                                <strong>{movie.nome}</strong>
                                <img src={movie.foto} alt={movie.nome} />
                                <Link to={`/filme/${movie.id}`}>Acessar</Link>
                            </article>
                        )
                    })  
                }
            </div>   
        </div>
    )
}