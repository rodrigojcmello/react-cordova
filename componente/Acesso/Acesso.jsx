import estilo from './Acesso.scss';

import Tela from '../_generico/Tela/Tela.jsx';

// Componente ----------------------------------------------------------------------------------------------------------

class Acesso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: ''
        };
        this.form = {};
    }
    atualizarEmail(evento) {
        this.setState({ email: evento.target.value });
    }
    atualizarSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
    autenticarEmail(evento) {
        console.log('Acesso - autenticarEmail()');
        // evento.preventDefault();
        // this.props.Firebase.usuario.autenticar.email({
        //     email: this.form.email.value,
        //     senha: this.form.senha.value
        // });
    }
    // autenticarFacebook(evento) {
    //     console.log('Acesso - autenticarFacebook()');
    //     evento.preventDefault();
    //     this.props.Firebase.usuario.cadastrar.facebook();
    // }
    render() {
        return (
            <Tela>
                <div className={ estilo.acesso }>
                    <h1 className={ estilo.titulo }>Acesso</h1>
                    <form onSubmit={ this.autenticarEmail.bind(this) }>
                        <input
                            className='campo'
                            onChange={ this.atualizarEmail.bind(this) }
                            placeholder='e-mail'
                            ref={ el => this.form.email = el }
                            type='text'
                            value={ this.state.email }
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
                    <form onSubmit={ this.props.autenticarFacebook }>
                        <button>Acessar com Facebook</button>
                    </form>
                </div>
            </Tela>            
        );
    }
}

export default Acesso;
