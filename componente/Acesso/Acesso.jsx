import UsuarioController from '../../controller/UsuarioController.js';

import './Acesso.pcss';

class Acesso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            senha: ''
        };
        this.form = {};
    }
    atualizarNome(evento) {
        this.setState({ nome: evento.target.value });
    }
    atualizarSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
    autenticarUsuario(evento) {
        evento.preventDefault();
        console.log('Acesso - autenticarUsuario()');
    }
    autenticarUsuario(evento) {
        evento.preventDefault();
        console.log('Acesso - autenticarUsuario()');
        UsuarioController.autenticar({
            nome: this.form.nome.value,
            senha: this.form.senha.value
        });
    }
    render() {
        return (
            <div className='tela acesso'>
                <h1>Acesso</h1>
                <form onSubmit={ this.autenticarUsuario.bind(this) }>
                    <input
                        className='campo'
                        onChange={ this.atualizarNome.bind(this) }
                        placeholder='nome'
                        ref={ el => this.form.nome = el }
                        type='text'
                        value={ this.state.nome }
                    />
                    <input
                        className='campo'
                        onChange={ this.atualizarSenha.bind(this) }
                        placeholder='senha'
                        ref={ el => this.form.senha = el }
                        type='password'
                        value={ this.state.entrada }
                    />
                    <button className='botao'>
                        Enviar
                    </button>
                </form>
            </div>
        );
    }
}

export default Acesso;
