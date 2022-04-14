/* {
    nome:
    id: "hash"
    uuid: 
    descrição:
    preço:
    imagens: []
    categoria: 
    destaque: false
    tags: []
} */


import mongoose from "mongoose";

const Schema = mongoose.Schema

const schema_url = new Schema({
	nome: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
    preco: {
        type: Number,
        required: true
    },
    imagens: {
        type: Array,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    destaque: {
        type: Boolean,
        required: false
    },
    tags: {
        type: Array,
        required: false
    }
	
})

export const productsDB = mongoose.model('Produtos', schema_url);