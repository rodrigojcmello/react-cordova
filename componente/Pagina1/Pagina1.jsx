import MensagemController from '../../controller/MensagemController.js';

import './Pagina1.pcss';

class Pagina1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrada: '',
            mensagem: []
        };
    }
    atualizarEntrada(evento) {
        this.setState({ entrada: evento.target.value });
    }
    enviarMensagem(evento) {
        evento.preventDefault();
        MensagemController.adicionar(this.entrada.value);
        console.log('Enviado!');
    }
    definirMensagem(mensagem) {
        console.log('Pagina1 - definirMensagem()', mensagem);
        this.setState({ mensagem: mensagem });
    }
    componentDidMount() {
        console.log('Pagina1 - componentDidMount()');
        MensagemController.sincronizar(this.definirMensagem.bind(this));
    }
    componentWillUnmount() {
        console.log('Pagina1 - componentWillUnmount');
        MensagemController.sincRemoto.cancel();
        MensagemController.sincLocal.cancel();
    }
    render() {
        return (
            <div className='tela pagina1'>
                <h1>Página 1</h1>
                <ul>
                    { _.map(this.state.mensagem, (mensagem, index) => {
                        return (
                            <li key={ index }>{ mensagem.usuario }: { mensagem.texto }</li>
                        );
                    }) }
                </ul>
                <form onSubmit={ this.enviarMensagem.bind(this) }>
                    <input
                        className='entrada'
                        onChange={ this.atualizarEntrada.bind(this) }
                        placeholder='digite aqui...'
                        ref={ el => this.entrada = el }
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
