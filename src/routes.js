import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Favorites from './pages/favorites';
import Movie from './pages/movie';
import Header from './components/header';
import Erro from './pages/erro';



export default function Routes() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/filme/:id" component={Movie} />
                <Route exact path="/favoritos" component={Favorites} />
                <Route exact path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    )
}