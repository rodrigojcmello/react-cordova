import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyA9ZNoBZItUqs-OTuAbYEljxE6htOYwxao',
    authDomain: 'e-list-a8a7c.firebaseapp.com',
    projectId: 'e-list-a8a7c'
});

const Firebase = {

    // Firestore -------------------------------------------------------------------------------------------------------

    init: (atualizarFirebaseInit) => {
        console.log('Firebase.init() 1');
        firebase.firestore().enablePersistence()
        .then(() => {
            console.log('Firebase.init() 2');
            Firebase.db = firebase.firestore();
        })
        .then(() => {
            console.log('Firebase.init() 3');
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

    // Nota ------------------------------------------------------------------------------------------------------------

    nota: {
        
        adicionar: ({ collection, nota }) => {
            console.log('Firebase nota - adicionar()');
            Firebase.db
            .collection(collection)
            .add(nota)
            .then((docRef) => {
                console.log('Firebase nota - Nota adicionada', docRef);
            })
            .catch((erro) => {
                console.error('Firebase nota - Erro ao adicionar nota', erro);
            });
        },
    
        sincronizar: (definirNotas) => {
            console.log('Firebase nota - sincronizar()');
            Firebase.db
            .collection('rodrigo/financeiro/contas a pagar')
            .onSnapshot((resultado) => {
                console.log('Firebase nota - Notas encontradas', resultado);
                let notas = [];
                resultado.forEach((doc) => {
                    notas.push(doc.data());
                });
               definirNotas(notas);
            });
        }

    },

    // Usuário ---------------------------------------------------------------------------------------------------------

    usuario: {

        cadastrar: {

            email: ({ email, senha }) => {
                firebase.auth().createUserWithEmailAndPassword(email, senha)
                .then((retorno) => {
                    console.log('Firebase - Usuário cadastrado com e-mail', retorno);
                })
                .catch((erro) => {
                    console.log('Firebase - Erro ao cadastrar usuáiro com e-mail', erro);
                });
            }

        },

        autenticar: {

            email: ({ email, senha }) => {

                firebase.auth().signInWithEmailAndPassword(email, senha)
                    .then((retorno) => {
                        console.log('Firebase - Usuário autenticado com e-mail', retorno);
                    })
                    .catch((erro) => {                        
                    console.log('Firebase - Erro ao autenticar usuário com e-mail', erro);
                });

            }

        }

    }

};

module.exports = Firebase;
