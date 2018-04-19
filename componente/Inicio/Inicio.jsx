// import estilo from './Inicio.pcss';
import './Inicio.pcss';
import imagem1 from './imagem.png';

class Inicio extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={ 'tela inicio' }>
                <img src={ imagem1 } />
                Início
            </div>
        );
    }
}

export default Inicio;
