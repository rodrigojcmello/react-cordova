import './Pagina1.pcss';

class Pagina1 extends Component {
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
        console.log('Pagina1 - enviarNota()');
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
        console.log('Pagina1 - componentDidMount()');
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('Pagina1 - getDerivedStateFromProps nextProps', nextProps);
        console.log('Pagina1 - getDerivedStateFromProps prevState', prevState);
        if (nextProps.firebaseInit === prevState.firebaseInit) {
            return null;
        }
        return { firebaseInit: true };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Pagina1 - componentDidUpdate prevState', prevState);
        console.log('Pagina1 - componentDidUpdate this.state', this.state);
        console.log('Pagina1 - componentDidUpdate prevProps', prevProps);
        console.log('Pagina1 - componentDidUpdate snapshot', snapshot);
        if (!this.state.firebaseInit_2) {
            if (prevState.firebaseInit) {
                console.log('Pagina1 - componentDidUpdate prevState.firebaseInit', prevState.firebaseInit);
                console.log('--------------------------------------------------------------------');
                this.setState({ firebaseInit_2: true });
                this.props.Firebase.nota.sincronizar(this.definirNotas.bind(this));
            }
        }
    }

    // ---------------------------------------------------------------------------------------------

    render() {
        console.log('Pagina1 - render this.state', this.state);
        return (
            <div className='tela pagina1'>
                <button onClick={ this.props.desconectarUsuario }>Sair</button>
                <h1>Página 1</h1>
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
            </div>
        );
    }
}

export default Pagina1;
