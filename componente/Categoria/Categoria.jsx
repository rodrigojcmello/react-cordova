import { Link } from 'react-router-dom';

import './Categoria.scss';

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrada: ''
        };
        this.form = {};
    }
    atualizarEntrada(evento) {
        this.setState({ entrada: evento.target.value });
    }
    enviarNota(evento) {
        console.log('Categoria - enviarNota()');
        evento.preventDefault();
        this.props.Firebase.nota.adicionar({
            collection: store.get('usuario').uid + '/' + 'notas/gerais',
            nota: {
                usuario: 'Rodrigo Mello',
                texto: this.form.entrada.value,
                data_criacao: Date.now()
            }
        });
        this.setState({ entrada: '' });
    }

    // Ciclô ---------------------------------------------------------------------------------------

    componentDidMount() {
        console.log('Categoria - componentDidMount()');
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('Categoria - getDerivedStateFromProps nextProps', nextProps);
        console.log('Categoria - getDerivedStateFromProps prevState', prevState);
        if (nextProps.firebaseInit === prevState.firebaseInit) {
            return null;
        }
        return { firebaseInit: true };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Categoria - componentDidUpdate prevState', prevState);
        console.log('Categoria - componentDidUpdate this.state', this.state);
        console.log('Categoria - componentDidUpdate prevProps', prevProps);
        console.log('Categoria - componentDidUpdate snapshot', snapshot);
        if (!this.state.firebaseInit_2) {
            if (prevState.firebaseInit) {
                console.log('Categoria - componentDidUpdate prevState.firebaseInit', prevState.firebaseInit);
                console.log('--------------------------------------------------------------------');
                this.setState({ firebaseInit_2: true });
                this.props.Firebase.nota.sincronizar(this.definirNotas.bind(this));
            }
        }
    }

    // ---------------------------------------------------------------------------------------------

    render() {
        console.log('Categoria - render this.state', this.state);
        return (
            <div className='tela pagina1'>
                <button onClick={ this.props.desconectarUsuario }>Sair</button>
                <h1>Categoria 1</h1>
                <ul>
                    { _.map(this.props.notas, (nota, index) => {
                        return (
                            <li key={ index }>{ nota.usuario }: { nota.texto }</li>
                        );
                    }) }
                </ul>
                <form onSubmit={ this.enviarNota.bind(this) }>
                    <input
                        className='entrada'
                        onChange={ this.atualizarEntrada.bind(this) }
                        placeholder='digite aqui...'
                        ref={ el => this.form.entrada = el }
                        type='text'
                        value={ this.state.entrada }
                    />
                    <button>
                        Enviar
                    </button>
                </form>
                <Link to='/cadastro' onClick={ this.props.atualizarTransicaoVoltar }>Cadastro</Link>
            </div>
        );
    }
}

export default Categoria;
