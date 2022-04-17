import {Schema, model, Document} from "mongoose";


interface ProductInterface extends Document {
    nome: string;
    descricao: string;
    preco: number;
    imagens: Array<string>;
    categoria: string;
    destaque?: boolean; 
    tags: Array<string>;
    quantidade: number;
}


const ProductSchema = new Schema({
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
    quantidade: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: false
    }, 
    cloudinary_id: String
	
})

export default model<ProductInterface>('Produtos', ProductSchema);