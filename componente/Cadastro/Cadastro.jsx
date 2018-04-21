import { Link } from 'react-router-dom';
import Tela from '../_generico/Tela/Tela.jsx';

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
        this.props.Firebase.usuario.cadastrar.email({
            // nome: this.form.nome.value,
            email: this.form.email.value,
            senha: this.form.senha.value
        });
    }
    render() {
        return (
            <Tela>
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
                    <Link to='/categoria' onClick={ this.props.atualizarTransicaoAvancar }>Categoria</Link>
                </form>
            </Tela>
        );
    }
}

export default Cadastro;
