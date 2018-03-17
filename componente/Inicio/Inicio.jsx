// import estilo from './Inicio.pcss';
import './Inicio.pcss';

class Inicio extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={ 'tela inicio' }>
                <img src={ require('./imagem.png') } />
                Início
            </div>
        );
    }
}

export default Inicio;
