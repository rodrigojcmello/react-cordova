import estilo from './Inicio.pcss';

class Inicio extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={ `tela ${ estilo.inicio }` }>
                <img src={ require('./imagem.png') } />
                Início
            </div>
        );
    }
}

export default Inicio;
