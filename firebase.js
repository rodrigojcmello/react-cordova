import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyA9ZNoBZItUqs-OTuAbYEljxE6htOYwxao',
    authDomain: 'e-list-a8a7c.firebaseapp.com',
    projectId: 'e-list-a8a7c'
});

const Banco = {

    init: (atualizarFirebaseInit) => {
        console.log('Banco.init() 1');
        firebase.firestore().enablePersistence()
        .then(() => {
            console.log('Banco.init() 2');
            Banco.db = firebase.firestore();
        })
        .then(() => {
            console.log('Banco.init() 3');
            atualizarFirebaseInit();
        })
        .catch((erro) => {
            if (erro.code == 'failed-precondition') {
                console.log('Erro na persistencia dos dados 1');
            } else if (erro.code == 'unimplemented') {
                console.log('Erro na persistencia dos dados 2');
            } else {
                console.log('Erro na persistencia dos dados 3');
            }
        });
    },

    adicionarNota: ({ collection, nota }) => {
        Banco.db
        .collection(collection)
        .add(nota)
        .then((docRef) => {
            console.log('Nota adicionada', docRef);
        })
        .catch((erro) => {
            console.error('Erro ao adicionar nota', erro);
        });
    },

    sincronizarNotas: (definirNotas) => {
        console.log('Banco sincronizarNotas()');
        Banco.db
        .collection('rodrigo/financeiro/contas a pagar')
        .onSnapshot((resultado) => {
            console.log('Notas encontradas', resultado);
            let notas = [];
            resultado.forEach((doc) => {
                notas.push(doc.data());
            });
           definirNotas(notas);
        });
        // .catch((erro) => {
        //     console.error('Erro ao buscar notas', erro);
        // });
    }

};

module.exports = Banco;
