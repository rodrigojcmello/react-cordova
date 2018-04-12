import { render } from 'react-dom';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import createHistory from 'history/createHashHistory';
const history = createHistory();

// -------------------------------------------------------------------------------------------------

import Firebase from '../firebase';

import Cadastro from './Cadastro/Cadastro.jsx';
import Acesso from './Acesso/Acesso.jsx';
import Inicio from './Inicio/Inicio.jsx';
import Categoria from './Categoria/Categoria.jsx';
import Pagina2 from './Pagina2/Pagina2.jsx';

// Estilo ------------------------------------------------------------------------------------------

import '../assets/scss/index.scss';

// Componente --------------------------------------------------------------------------------------

const Autenticado = ({ componente: Componente, id_usuario, ...resto }) => (
    <Route { ...resto } render={ props => (
        id_usuario
        ? <Componente { ...resto } />
        : (
            <Redirect to={{
                pathname: '/acesso',
                state: { from: resto.location }
            }} />
        )
    )} />
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transicao: 'esmanhecer-avancar',
            usuario: store.get('usuario') ? store.get('usuario') : {},
            firebaseInit: false,
            notas: []
        };
    }
    atualizarUsuario(usuario) {
        console.log('Index - atualizarUsuario()', usuario);
        store.set('usuario', usuario);
        this.setState({ usuario: usuario });
    }
    autenticarFacebook(evento) {
        evento.preventDefault();
        Firebase.usuario.cadastrar.facebook(this.atualizarUsuario.bind(this));
    }
    atualizarTransicaoVoltar() {
        this.setState({ transicao: 'esmanhecer-voltar' });
    }
    atualizarTransicaoAvancar() {
        this.setState({ transicao: 'esmanhecer-avancar' });
    }
    desconectarUsuario() {
        Firebase.usuario.desconectar(this.atualizarUsuario.bind(this));
    }
    atualizarNotas(notas) {
        console.log('Index - atualizarNotas()', notas);
        this.setState({ notas: notas });
    }
    componentDidMount() {
        Firebase.init(this.state.usuario.uid, this.atualizarNotas.bind(this));
    }
    render() {
        return (
            <HashRouter>
                <Route render={ (props) => (
                    <TransitionGroup>
                        <CSSTransition
                            classNames={ this.state.transicao }
                            key={ props.location.pathname.split('/')[1] || '/' }
                            timeout={ 600 }
                        >
                            <Switch location={ props.location }>
                                <Route path='/cadastro' render={ () => <Cadastro
                                    Firebase={ Firebase }
                                    atualizarTransicaoAvancar={ this.atualizarTransicaoAvancar.bind(this) }
                                /> } />
                                <Route path='/acesso' component={ () => (
                                    this.state.usuario.uid ?
                                    <Redirect to='/categoria' /> :
                                    <Acesso
                                        autenticarFacebook={ this.autenticarFacebook.bind(this) }
                                    />
                                ) } />
                                <Route path='/inicio' component={ Inicio } />
                                <Autenticado
                                    componente={ Categoria }
                                    desconectarUsuario={ this.desconectarUsuario.bind(this) }
                                    Firebase={ Firebase }
                                    id_usuario={ this.state.usuario.uid }
                                    notas={ this.state.notas }
                                    path='/categoria'
                                    atualizarTransicaoVoltar={ this.atualizarTransicaoVoltar.bind(this) }
                                />
                                <Route path='/pagina2' component={ Pagina2 } />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                ) } />
            </HashRouter>
        );
    }
}

render((<App />), document.getElementById('app'));
