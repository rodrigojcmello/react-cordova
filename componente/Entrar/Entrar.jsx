import MensagemController from '../../controller/MensagemController.js';

import './Entrar.pcss';

class Entrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: ''
        };
    }
    atualizarEmail(evento) {
        this.setState({ email: evento.target.value });
    }
    atualizarSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
    autenticarUsuario(evento) {
        evento.preventDefault();
        console.log('Entrar - autenticarUsuario()');
    }
    render() {
        return (
            <div className='tela entrar'>
                <h1>Entrar</h1>
                <form onSubmit={ this.autenticarUsuario.bind(this) }>
                    <input
                        className='email'
                        onChange={ this.atualizarEmail.bind(this) }
                        placeholder='email'
                        ref={ el => this.email = el }
                        type='email'
                        value={ this.state.entrada }
                    />
                    <input
                        className='senha'
                        onChange={ this.atualizarSenha.bind(this) }
                        placeholder='senha'
                        ref={ el => this.senha = el }
                        type='password'
                        value={ this.state.entrada }
                    />
                    <button>
                        Entrar
                    </button>
                </form>
            </div>
        );
    }
}

export default Entrar;
