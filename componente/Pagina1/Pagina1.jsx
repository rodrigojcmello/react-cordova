import MensagemController from '../../controller/MensagemController.js';

import './Pagina1.pcss';

class Pagina1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrada: '',
            mensagem: [
                { texto: 'Teste 1' },
                { texto: 'Teste 2' },
                { texto: 'Teste 3' },
                { texto: 'Teste 4' }
            ]
        };
    }
    atualizarEntrada(evento) {
        this.setState({ entrada: evento.target.value });
    }
    enviarMensagem(evento) {
        evento.preventDefault();
        MensagemController.adicionar({
            texto: this.entrada.value
        });
        console.log('Enviado!');
    }
    render() {
        return (
            <div className='tela pagina1'>
                <h1>Página 1</h1>
                <ul>
                    { _.map(this.state.mensagem, (mensagem, index) => {
                        return (
                            <li key={ index }>{ mensagem.texto }</li>
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
