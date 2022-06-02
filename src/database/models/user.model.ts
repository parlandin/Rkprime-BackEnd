import {Schema, model, Document} from "mongoose";


interface ProductInterface extends Document {
    nome: string;
    email: string;
    senha: string;
    perfil_foto: string;
    cargo?: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
}


const UserSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
        unique: true
	},
    senha: {
        type: String,
        required: true,
        select: false
    },
    perfil_foto: {
        type: String,
        required: false
    },
    cargo: {
        type: String,
        required: false
    },
    passwordResetToken: {
        type: String,
        required: false,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
	
})

export default model<ProductInterface>('User', UserSchema);