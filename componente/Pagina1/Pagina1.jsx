import Nota from '../../database/Nota';

import './Pagina1.pcss';

class Pagina1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrada: '',
            notas: []
        };
        this.form = {};
    }
    atualizarEntrada(evento) {
        this.setState({ entrada: evento.target.value });
    }
    enviarNota(evento) {
        console.log('enviarNota()');
        evento.preventDefault();
        Nota.adicionar({
            texto: this.form.entrada.value,
            usuario: 'Rodrigo Mello'
        });
    }
    definirNotas(notas) {
        console.log('definirNotas()', notas);
        this.setState({ notas: notas });
    }
    componentDidMount() {
        console.log('componentDidMount()');
        Nota.init(this.definirNotas.bind(this));
    }
    render() {
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
