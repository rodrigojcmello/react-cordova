import config from '../config';

// ---------------------------------------------------------------------------------------------------------------------

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-authentication'));
const dbLocal = new PouchDB('usuario');
const dbRemoto = new PouchDB(`${ config.host }:5984/usuario`);
console.log('UsuarioController');

// ---------------------------------------------------------------------------------------------------------------------

const Usuario = {

	// sincronizar: (definirUsuario) => {
	// 	Usuario.sincRemoto = dbRemoto.replicate.to(dbLocal, {
	// 		retry: true,
	// 		// filter: 'mydesign/myfilter',
	// 		// query_params: { usuario: 'rodrigo' }
	// 	}).on('complete', (info) => { // TODO: E se estiver offline? Completa mesmo assim?
	// 		console.log('PouchDB Usuario - Sincronização completa com a base remota', info);
	// 		Usuario.listar(definirUsuario);

	// 		// Sincronização Remoto-Local ------------------------------------------------------------------------------

	// 		Usuario.sincRemoto = dbRemoto.replicate.to(dbLocal, {
	// 			live: true,
	// 			retry: true,
	// 			// filter: 'mydesign/myfilter',
	// 			// query_params: { usuario: 'rodrigo' }
	// 		}).on('change', (info) => {
	// 			console.log('PouchDB Usuario - Mudança na base remota', info);
	// 			Usuario.listar(definirUsuario);
	// 		}).on('error', (erro) => {
	// 			console.error('PouchDB Usuario - Erro ao receber mudança', erro);
	// 		});

	// 		// Sincronização Local-Remoto ------------------------------------------------------------------------------

	// 		Usuario.sincLocal = dbLocal.replicate.to(dbRemoto, {
	// 			live: true,
	// 			retry: true
	// 		}).on('change', (info) => {
	// 			console.log('PouchDB Usuario - Mudança na base local', info);
	// 			Usuario.listar(definirUsuario);
	// 		}).on('error', (erro) => {
	// 			console.error('PouchDB Usuario - Erro ao enviar mudança', erro);
	// 		});

	// 		// ---------------------------------------------------------------------------------------------------------

	// 	}).on('paused', (erro) => {
	// 		console.error('PouchDB Usuario - Pausada sincronização com base remota', erro);
	// 		Usuario.listar(definirUsuario);
	// 	}).on('error', (erro) => {
	// 		console.error('PouchDB Usuario - Erro ao sincroniar base remota', erro);
	// 	});
	// },

	// listar: (definirItens) => {
    //     dbLocal.createIndex({
    //         index: { fields: ['usuario'] }
    //     }).then(() => {
    //         return (
    //             dbLocal.find({
    //                 selector: {
	// 					usuario: { $eq: 'rodrigo' }
	// 				}
    //             })
    //         );
    //     }).then((resposta) => {
    //         console.log('PouchDB Usuario - Itens encontrados localmente', resposta.docs);
    //         definirItens(resposta.docs);
    //     }).catch((erro) => {
    //         console.error('PouchDB Usuario - Erro ao encontrar', erro);
    //     });
    // },

	autenticar: (form) => {
		console.log('PouchDB Usuario - autenticar()', form);
		dbRemoto.logIn(form.nome, form.senha, (err, response) => {
			if (err) {
				console.error('PouchDB Usuario - Erro ao autenticar', err);
				if (err.name === 'unauthorized' || err.name === 'forbidden') {
					// name or password incorrect
				} else {
					// cosmic rays, a meteor, etc.
				}
			} else {
				console.log('PouchDB Usuario - Autenticado', response);
			}
		});
	},

	cadastrar: (form) => {
		console.log('PouchDB Usuario - cadastrar()', form);
		dbRemoto.signUp(form.nome, form.senha, (err, response) => {
			if (err) {
				console.log('PouchDB Usuario - Erro ao cadastrar no base remota', err);
				if (err.name === 'conflict') {
					// "batman" already exists, choose another username
				} else if (err.name === 'forbidden') {
					// invalid username
				} else {
					// HTTP error, cosmic rays, etc.
				}
			} else {
				console.log('PouchDB Usuario - Cadastrado na base remota');
			}
		});
	},

	// atualizar: (Usuario) => {
	// 	dbLocal.put(Usuario);
	// }

};

export default Usuario;
