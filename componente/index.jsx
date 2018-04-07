 import { render } from 'react-dom';

import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import createHistory from 'history/createHashHistory';
const history = createHistory();

// ---------------------------------------------------------------------------------------------------------------------

import Firebase from '../firebase';

import Cadastro from './Cadastro/Cadastro.jsx';
import Acesso from './Acesso/Acesso.jsx';
import Inicio from './Inicio/Inicio.jsx';
import Pagina1 from './Pagina1/Pagina1.jsx';
import Pagina2 from './Pagina2/Pagina2.jsx';

// Produção ------------------------------------------------------------------------------------------------------------

// Desativa o console em produção

if (process.env.NODE_ENV == 'production') console.log = () => {};

// Estilo --------------------------------------------------------------------------------------------------------------

import '../assets/html/pcss/_index.pcss';

// Compoenente ---------------------------------------------------------------------------------------------------------

// const Autenticado = ({ component: Component, email, ...rest }) => (
//     <Route { ...rest } render={ props => (
//         email ?
//         <Component { ...rest } /> :
//         <Redirect to={{
//             pathname: '/pagina2',
//             state: { from: rest.location }
//         }} />
//     )} />
// );

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
    // atualizarFirebaseInit() {
    //     console.log('Index - atualizarFirebaseInit()');
    //     this.setState({ firebaseInit: !this.state.firebaseInit });
    // }
    atualizarUsuario(usuario) {
        console.log('Index - atualizarUsuario()', usuario);
        store.set('usuario', usuario);
        this.setState({ usuario: usuario });
    }
    autenticarFacebook(evento) {
        evento.preventDefault();
        Firebase.usuario.cadastrar.facebook(this.atualizarUsuario.bind(this));
    }
    atualizarNotas(notas) {
        console.log('Index - atualizarNotas()', notas);
        this.setState({ notas: notas });
    }
    componentDidMount() {
        Firebase.init(this.atualizarNotas.bind(this));
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path='/cadastro' render={ () => <Cadastro
                        Firebase={ Firebase }
                    /> } />
                    <Route path='/acesso' component={ () => (
                        this.state.usuario.uid
                        ? <Redirect to='/pagina1' />
                        : (
                            <Acesso
                                autenticarFacebook={ this.autenticarFacebook.bind(this) }
                            />
                        )
                    ) } />
                    <Route path='/inicio' component={ Inicio } />
                    <Autenticado
                        path='/pagina1'
                        id_usuario={ this.state.usuario.uid }
                        notas={ this.state.notas }
                        componente={ Pagina1 }
                        Firebase={ Firebase }
                    />
                    <Route path='/pagina2' component={ Pagina2 } />
                    <div>
                        <Link to='/acesso'>acesso</Link>
                        <Link to='/pagina1'>pagina1</Link>
                        <Link to='/pagina2'>pagina2</Link>
                    </div>
                </div>
            </HashRouter>
        );
        // return (
        //     <HashRouter>
        //         <Route render={ props => (
        //             <TransitionGroup>
        //                 <CSSTransition
        //                     classNames={ this.state.transicao }
        //                     key={ props.location.pathname.split('/')[1] || '/' }
        //                     timeout={ 2000 }
        //                 >
        //                     <Switch location={ props.location }>
        //                         <Route
        //                             path='/acesso'
        //                             component={ Acesso }
        //                         />
        //                         <Route
        //                             path='/inicio'
        //                             component={ Inicio }
        //                         />
        //                         <Autenticado
        //                             path='/pagina1'
        //                             component={ Pagina1 }
        //                         />
        //                         {/* <Route
        //                             path='/pagina1'
        //                             component={ Pagina1 }
        //                         /> */}
        //                         <Route
        //                             path='/pagina2'
        //                             component={ Pagina2 }
        //                         />
        //                     </Switch>
        //                 </CSSTransition>
        //             </TransitionGroup>
        //         ) } />
        //     </HashRouter>
        // );
    }
}

render((<App />), document.getElementById('app'));
