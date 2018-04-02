import './Pagina1.pcss';

class Pagina1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrada: '',
            notas: []
        };
        this.form = {};
        // this.getDerivedStateFromProps = this.getDerivedStateFromProps.bind(this);
    }
    atualizarEntrada(evento) {
        this.setState({ entrada: evento.target.value });
    }
    enviarNota(evento) {
        console.log('enviarNota()');
        evento.preventDefault();
        this.props.Firebase.nota.adicionar({
            collection: `${ 'rodrigo' }/${ 'financeiro' }/${ 'contas a pagar' }`,
            nota: {
                usuario: 'Rodrigo Mello',
                texto: this.form.entrada.value,
                data_criacao: Date.now()
            }
        });
        this.setState({ entrada: '' });
    }
    definirNotas(notas) {
        console.log('definirNotas()', notas);
        this.setState({ notas: notas });
    }
    componentDidMount() {
        console.log('componentDidMount()');
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
        console.log('Pagina1 - componentDidUpdate prevProps', prevProps);
        console.log('Pagina1 - componentDidUpdate snapshot', snapshot);
        if (!prevState.firebaseInit_2) {
            if (prevState.firebaseInit) {
                console.log('Pagina1 - componentDidUpdate prevState.firebaseInit', prevState.firebaseInit);
                this.setState({ firebaseInit_2: true });
                this.props.Firebase.nota.sincronizar(this.definirNotas.bind(this));
            }
        }
    }
    render() {
        console.log('Pagina1 - render this.state.firebaseInit', this.state.firebaseInit);
        return (
            <div className='tela pagina1'>
                <h1>Página 1</h1>
                <ul>
                    { _.map(this.state.notas, (nota, index) => {
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
