import './movie-info.css';
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';

import api from '../../services/api';

export default function Movie() {
    const {id} = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadMovie(){
            const response = await api.get(`r-api/?api=filmes/${id}`)

            if(response.data.length === 0){
                //tentou acessar com um ID que nao existe nevega ele para home
                history.replace('/');
                // passando return para parar aplicação
                return;
            }else {
                setMovie(response.data);
                setLoading(false);
            }
        }

        loadMovie();
        return () => {
            console.log("componente desmontado")
        }
    }, [id, history]);
    // passando o id como depedencia do useEffect caso sofra alteração no component ele rendereza novamente 
    // mais ira necessitar de um id


    function SaveMovie() {
        const listMovie = localStorage.getItem('movies');

        let savedMovies = JSON.parse(listMovie) || [];

        //se tiver filme salvo com mesmo id precisa ignorar
        const hasMovie =  savedMovies.some((savedMovies)=> savedMovies.id === movie.id)
        if(hasMovie){
            toast.info("Você já possui um filme salvo");
            return;
        }

        savedMovies.push(movie);
        localStorage.setItem('movies', JSON.stringify(savedMovies));
        toast.success("Filme salvo em favoritos")
    }

    if(loading){
        return(
            <div className="loading">
                <h3>Carregando...</h3>
            </div>
        )
    }
    return(
        <div className="movie-info">
            <h1>{movie.nome}</h1>
            <img src={movie.foto} alt={movie.nome} />

            <h3>Sinopse</h3>
            <p>{movie.sinopse}</p>

            <div className="buttons">
                <button onClick={ SaveMovie }>Favoritos</button>
                <button onClick={()=>{}}>
                    <a target="blank" href={`http://youtube.com/results?search_query=${movie.nome} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}