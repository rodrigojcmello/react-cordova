import config from '../config';

// ---------------------------------------------------------------------------------------------------------------------

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));
const dbLocal = new PouchDB('mensagem');
const dbRemoto = new PouchDB(`${ config.host }:5984/mensagem`);
console.log('MensagemController');

// ---------------------------------------------------------------------------------------------------------------------

const Mensagem = {

	sincronizar: (definirMensagem) => {
		Mensagem.sincRemoto = dbRemoto.replicate.to(dbLocal, {
			filter: 'mydesign/myfilter',
			query_params: { usuario: 'jessica' }
		}).on('complete', (info) => { // TODO: E se estiver offline? Completa mesmo assim?
			console.log('PouchDB Mensagem - Sincronização completa com a base remota', info);
			Mensagem.listar(definirMensagem);

			// Sincronização Remoto-Local ------------------------------------------------------------------------------

			Mensagem.sincRemoto = dbRemoto.replicate.to(dbLocal, {
				live: true,
				retry: true,
				filter: 'mydesign/myfilter',
				query_params: { usuario: 'jessica' }
			}).on('change', (info) => {
				console.log('PouchDB Mensagem - Mudança na base remota', info);
				Mensagem.listar(definirMensagem);
			}).on('error', (erro) => {
				console.error('PouchDB Mensagem - Erro ao receber mudança', erro);
			});

			// Sincronização Local-Remoto ------------------------------------------------------------------------------

			Mensagem.sincLocal = dbLocal.replicate.to(dbRemoto, {
				live: true,
				retry: true
			}).on('change', (info) => {
				console.log('PouchDB Mensagem - Mudança na base local', info);
				Mensagem.listar(definirMensagem);
			}).on('error', (erro) => {
				console.error('PouchDB Mensagem - Erro ao enviar mudança', erro);
			});

			// ---------------------------------------------------------------------------------------------------------

		}).on('error', (erro) => {
			console.error('PouchDB Mensagem - Erro ao receber mudança', erro);
		});
	},

	listar: (definirItens) => {
        dbLocal.createIndex({
            index: { fields: ['data_criacao'] }
        }).then(() => {
            return (
                dbLocal.find({
                    selector: {
						data_criacao: { $gt: null }
					}
                })
            );
        }).then((resposta) => {
            console.log('PouchDB Mensagem - Itens encontrados localmente', resposta.docs);
            definirItens(resposta.docs);
        }).catch((erro) => {
            console.error('PouchDB Mensagem - Erro ao encontrar', erro);
        });
    },

	adicionar: (texto) => {
		dbLocal.post({
			usuario: 'jessica',
			texto: texto,
			data_criacao: new Date(),
		}).then((resposta) => {
			console.log('PouchDB Mensagem - Adicionado localmente', resposta);
		}).catch((erro) => {
			console.error('PouchDB Mensagem - Erro ao adicionar localmente', erro);
		});
	},

	atualizar: (mensagem) => {
		dbLocal.put(mensagem);
	}

};

export default Mensagem;
