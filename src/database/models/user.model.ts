import {Schema, model, Document} from "mongoose";


interface ProductInterface extends Document {
    nome: string;
    email: string;
    senha: string;
    perfil_foto: string;
    cargo?: string; 
}


const UserSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
    senha: {
        type: String,
        required: true
    },
    perfil_foto: {
        type: String,
        required: false
    },
    cargo: {
        type: String,
        required: false
    }
	
})

export default model<ProductInterface>('User', UserSchema);