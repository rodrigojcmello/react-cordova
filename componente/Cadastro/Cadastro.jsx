import UsuarioController from '../../controller/UsuarioController.js';

import './Cadastro.pcss';

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: ''
        };
        this.form = {};
    }
    atualizarNome(evento) {
        this.setState({ nome: evento.target.value });
    }
    atualizarEmail(evento) {
        this.setState({ email: evento.target.value });
    }
    atualizarSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
    cadastrarUsuario(evento) {
        evento.preventDefault();
        console.log('Acesso - cadastrarUsuario()');
        UsuarioController.cadastrar({
            nome: this.form.nome.value,
            email: this.form.email.value,
            senha: this.form.senha.value
        });
    }
    render() {
        return (
            <div className='tela Cadastro'>
                <h1>Cadastro</h1>
                <form onSubmit={ this.cadastrarUsuario.bind(this) }>
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
                        onChange={ this.atualizarEmail.bind(this) }
                        placeholder='email'
                        ref={ el => this.form.email = el }
                        type='email'
                        value={ this.state.entrada }
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

export default Cadastro;
