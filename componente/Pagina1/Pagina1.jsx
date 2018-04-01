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
        this.props.Firebase.adicionarNota({
            collection: `${ 'rodrigo' }/${ 'financeiro' }/${ 'contas a pagar' }`,
            nota: {
                texto: this.form.entrada.value,
                data_criacao: Date.now()
            }
        });
    }
    definirNotas(notas) {
        console.log('definirNotas()', notas);
        this.setState({ notas: notas });
    }
    componentDidMount() {
        console.log('componentDidMount()');
        // if (this.props.firebaseInit) {
            // this.props.Firebase.sincronizarNotas(this.definirNotas.bind(this));            
        // }
        // setTimeout(() => {
        //     this.props.Firebase.sincronizarNotas(this.definirNotas.bind(this));            
        // }, 700);
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
        if (!prevState.firebaseInit_3) {
            if (prevState.firebaseInit && !prevState.firebaseInit_2) {
                console.log('Pagina1 - componentDidUpdate IF');
                this.setState({ firebaseInit_2: true });
            } else if (prevState.firebaseInit && prevState.firebaseInit_2) {
                console.log('Pagina1 - componentDidUpdate IF 2');
                this.setState({ firebaseInit_3: true });
                this.props.Firebase.sincronizarNotas(this.definirNotas.bind(this));
            } else {
                console.log('ELSE', prevState.firebaseInit, this.state.firebaseInit);
            }
        }
    }
    render() {
        console.log('render', this.state.firebaseInit);
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
