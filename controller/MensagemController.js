import config from '../config';

// ---------------------------------------------------------------------------------------------------------------------

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('mensagem');
console.log('MensagemController');

// ---------------------------------------------------------------------------------------------------------------------

const Mensagem = {

	sincronizar: () => {
		Mensagem.sinc = PouchDB.sync('mensagem', `${ config.host }:5984/mensagem`, {
			live: true,
			retry: true
		}, (erro) => {
			console.error('PouchDB - Erro ao sincronizar os mensagens', erro);
		});
	},

	cancelarSinc: () => { Mensagem.sinc.cancel() },

	listar: (definirItens) => {
        db.createIndex({
            index: { fields: ['data_criacao'] }
        }).then(() => {
            return (
                db.find({
                    selector: {
						data_criacao: { $gt: null }
					}
                })
            );
        }).then((resposta) => {
            console.log('PouchDB - Mensagem encontradas', resposta.docs);
            definirItens(resposta.docs);
        }).catch((erro) => {
            console.error('PouchDB - Erro ao listar mensagens', erro);
        });
    },

	ouvirMudancas: (definirItens) => {
		Mensagem.mudanças = db.changes({
			since: 'now',
			live: true
		}).on('change', () => {
			console.log('PouchDB - Mudanças nos mensagens');
			Mensagem.listar(definirItens);
		});
	},

	cancelarMudancas: () => {
		Mensagem.mudanças.cancel();
	},

	adicionar: (texto) => {
		db.post({
			texto: texto,
			data_criacao: new Date(),
		}).then((resposta) => {
			console.log('PouchDB - Mensagem adicionado', resposta);
		}).catch((erro) => {
			console.error('PouchDB - Erro ao adicionar mensagem', erro);
		});
	},

	atualizar: (mensagem) => {
		db.put(mensagem);
	}

};

export default Mensagem;
