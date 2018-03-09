import { render } from 'react-dom';
// import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Inicio from './Inicio/Inicio.jsx';

// Produção ------------------------------------------------------------------------------------------------------------

// Desativa o console em produção

if (process.env.NODE_ENV == 'production') console.log = () => {};

// ---------------------------------------------------------------------------------------------------------------------
// Estilo
// ---------------------------------------------------------------------------------------------------------------------

// import './index.pcss';

// ---------------------------------------------------------------------------------------------------------------------
// Compoenente
// ---------------------------------------------------------------------------------------------------------------------

// class App extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <HashRouter>
//                 <Route render={ props => (
//                     <div>
//                         <TransitionGroup component='main' className='page-main'>
//                             <CSSTransition
//                                 classNames={ this.state.transicao }
//                                 key={ props.location.pathname.split('/')[1] || '/' }
//                                 timeout={ 400 }
//                             >
//                                 <section className='page'>
//                                     <Switch location={ props.location }>
//                                         <Route
//                                             path='/inicio'
//                                             component={ Inicio }
//                                         />
//
//                                     </Switch>
//                                 </section>
//                             </CSSTransition>
//                         </TransitionGroup>
//                     </div>
//                 ) } />
//             </HashRouter>
//         );
//     }
// }

// render((<App />), document.getElementById('app'));
render((<Inicio />), document.getElementById('app'));
