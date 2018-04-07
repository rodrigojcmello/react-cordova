import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyA9ZNoBZItUqs-OTuAbYEljxE6htOYwxao',
    authDomain: 'e-list-a8a7c.firebaseapp.com',
    projectId: 'e-list-a8a7c'
});

const Firebase = {

    // Firestore -----------------------------------------------------------------------------------

    init: (atualizarFirebaseInit) => {
        console.log('Firebase Firestore - init()');
        firebase.firestore().enablePersistence()
        .then(() => {
            console.log('Firebase Firestore - base de dados inicializada');
            Firebase.db = firebase.firestore();
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

    // Nota ----------------------------------------------------------------------------------------

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

        sincronizar: (id_usuario, definirNotas) => {
            console.log('Firebase Firestore - sincronizar()');
            Firebase.db
            .collection(`${ id_usuario }/notas`)
            .onSnapshot((resultado) => {
                console.log('Firebase Firestore - notas sincronizadas', resultado);
                let notas = [];
                resultado.forEach((doc) => {
                    notas.push(doc.data());
                });
               definirNotas(notas);
           });
        }

    },

    // Usuário -------------------------------------------------------------------------------------

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
            },

            facebook: (atualizarUsuario) => {
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider)
                .then((resultado) => {
                    console.log('Firebase - Usuário cadastrado com Facebook', resultado);
                    atualizarUsuario(resultado.user);
                }).catch((error) => {
                    console.log('Firebase - Erro ao cadastrar usuário com Facebook', error);
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
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
