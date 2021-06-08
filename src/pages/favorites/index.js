import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import './favorites.css';

export default function Favorites() {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        const list = localStorage.getItem('movies');
        setMovies(JSON.parse(list) || []);
    },[]);

    function handleDelete(id){

        let filterMovie = movies.filter((item)=>{
            return(item.id !== id)
        })

        setMovies(filterMovie);
        localStorage.setItem('movies', JSON.stringify(filterMovie));
        toast.success('Filme excluid com sucesso');
    }
    
    return (
        <div id="favorite-movie">
            <h1>Meus Filmes</h1>
            {movies.length === 0 && <span>Você não possui nenhum filme em favoritos :( </span>}
            <ul>
                {movies.map((movie)=>{
                    return(
                        <li key={movie.id}>
                            <div className="img-movie">
                                <img src={movie.foto} alt={movie.nome} />
                                <span>{movie.nome}</span>
                            </div>

                            <div className="buttons-movie">
                                <Link to={`/filme/${movie.id}`}>Ver detalhes</Link>
                                <button onClick={ (e)=> handleDelete(movie.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}