import { render } from 'react-dom';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Inicio from './Inicio/Inicio.jsx';
import Pagina1 from './Pagina1/Pagina1.jsx';
import Pagina2 from './Pagina2/Pagina2.jsx';

// Produção ------------------------------------------------------------------------------------------------------------

// Desativa o console em produção

if (process.env.NODE_ENV == 'production') console.log = () => {};

// Estilo --------------------------------------------------------------------------------------------------------------

import '../assets/html/pcss/_index.pcss';

// Compoenente ---------------------------------------------------------------------------------------------------------

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transicao: 'esmanhecer-avancar'
        };
    }
    render() {
        return (
            <HashRouter>
                <Route render={ props => (
                    <TransitionGroup>
                        <CSSTransition
                            classNames={ this.state.transicao }
                            key={ props.location.pathname.split('/')[1] || '/' }
                            timeout={ 2000 }
                        >
                            <Switch location={ props.location }>
                                <Route
                                    path='/inicio'
                                    component={ Inicio }
                                />
                                <Route
                                    path='/pagina1'
                                    component={ Pagina1 }
                                />
                                <Route
                                    path='/pagina2'
                                    component={ Pagina2 }
                                />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                ) } />
            </HashRouter>
        );
    }
}

render((<App />), document.getElementById('app'));
