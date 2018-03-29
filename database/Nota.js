import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyA9ZNoBZItUqs-OTuAbYEljxE6htOYwxao',
    authDomain: 'e-list-a8a7c.firebaseapp.com',
    projectId: 'e-list-a8a7c'
});

const Nota = {

    init: (definirNotas) => {
        firebase.firestore().enablePersistence()
        .then(() => {
            Nota.db = firebase.firestore();
            Nota.buscarTodas(definirNotas);
            Nota.sincronizar(definirNotas);
        })
        .catch((err) => {
            if (err.code == 'failed-precondition') {}
            else if (err.code == 'unimplemented') {}
        });
    },

    adicionar: (nota) => {
        Nota.db.collection('notas').add(nota)
        .then((docRef) => {
            console.log('Nota adicionada', docRef);
        })
        .catch((erro) => {
            console.error('Erro ao adicionar nota', erro);
        });
    },

    buscarTodas: (definirNotas) => {
        Nota.db.collection('notas').get().then((resultado) => {
            console.log('Notas encontradas', resultado);
            let notas = [];
            resultado.forEach((doc) => {
                notas.push(doc.data());
            });
           definirNotas(notas);
        }).catch((erro) => {
            console.error('Erro ao buscar notas', erro);
        });;
    },

    sincronizar: (definirNotas) => {
        Nota.db.collection('notas').onSnapshot((resultado) => {
            let notas = [];
            resultado.forEach((doc) => {
                notas.push(doc.data());
            });
           definirNotas(notas);
        });
    }

};

export default Nota;
