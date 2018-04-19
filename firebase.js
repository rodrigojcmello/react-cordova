import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyA9ZNoBZItUqs-OTuAbYEljxE6htOYwxao',
    authDomain: 'e-list-a8a7c.firebaseapp.com',
    projectId: 'e-list-a8a7c'
});


const Firebase = {

    // Base de dados ---------------------------------------------------------------------------------------------------

    init: (inicializarFirestore) => {
        console.log('Firebase Firestore - init()');
        firebase.firestore().enablePersistence()
        .then(() => {
            console.log('Firebase Firestore - inicializado');
            Firebase.db = firebase.firestore();
            inicializarFirestore();
        })
        .catch((erro) => {
            console.log('Firebase Firestore - erro na persistência de dados', erro);
        });
    },

    // Nota --------------------------------------------------------------------

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

        sincronizar: (id_usuario, atualizarNotas) => {
            console.log('Firebase Firestore - sincronizar()');
            Firebase.db
            .collection(`${ id_usuario }/notas/gerais`)
            .onSnapshot((resultado) => {
                console.log('Firebase Firestore - notas sincronizadas', resultado);
                let notas = [];
                resultado.forEach((doc) => {
                    notas.push(doc.data());
                });
                atualizarNotas(notas);
            });
        }

    },

    // Autenticação ----------------------------------------------------------------------------------------------------

    autenticacao: {

        // Inicialização -------------------------------------------------------

        init: (atualizarUsuario) => {
            console.log('Firebase.autenticacao.init()');
            firebase.auth().onAuthStateChanged((usuario) => {
                console.log('Firebase.autenticacao.init() - firebase.auth().onAuthStateChanged', usuario);
                atualizarUsuario(usuario);
            });
        },

        // Facebook ------------------------------------------------------------

        facebook: (atualizarUsuario) => {
            console.log('Firebase.autenticacao.facebook()');
            let provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then((resultado) => {
                console.log('Firebase.autenticacao.facebook() - Usuário autenticado com Facebook', resultado);
            }).catch((erro) => {
                console.log('Firebase.autenticacao.facebook() - Erro ao autenticar usuário com Facebook', erro);
            });
        },

    },


    usuario: {

        atual: () => {
            console.log('Firebase Autenticação - firebase.auth.currentUser', firebase.auth().currentUser);
            return firebase.auth().currentUser;
        },



        // cadastrar: {
        //
        //     email: ({ email, senha }) => {
        //         firebase.auth().createUserWithEmailAndPassword(email, senha)
        //         .then((retorno) => {
        //             console.log('Firebase - Usuário cadastrado com e-mail', retorno);
        //         })
        //         .catch((erro) => {
        //             console.log('Firebase - Erro ao cadastrar usuáiro com e-mail', erro);
        //         });
        //     },
        //
        //     facebook: (atualizarUsuario) => {
        //         var provider = new firebase.auth.FacebookAuthProvider();
        //         firebase.auth().signInWithPopup(provider)
        //         .then((resultado) => {
        //             console.log('Firebase Autenticação - Usuário autenticado com Facebook', resultado);
        //             atualizarUsuario(resultado.user);
        //         }).catch((erro) => {
        //             console.log('Firebase Autenticação - Erro ao autenticar usuário com Facebook', erro);
        //         });
        //     }
        //
        // },

        // autenticar: {
        //
        //     email: ({ email, senha }) => {
        //
        //         firebase.auth().signInWithEmailAndPassword(email, senha)
        //         .then((retorno) => {
        //             console.log('Firebase - Usuário autenticado com e-mail', retorno);
        //         })
        //         .catch((erro) => {
        //             console.log('Firebase - Erro ao autenticar usuário com e-mail', erro);
        //         });
        //
        //     }
        //
        // },

        desconectar: (atualizarUsuario) => {
            firebase.auth().signOut().then(() => {
                atualizarUsuario({});
            }).catch((erro) => {
                console.log('Firebase Autenticação - Erro ao desconectar usuário', erro);
            });
        }

    }

};

export default Firebase;
