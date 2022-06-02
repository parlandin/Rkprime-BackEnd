import {Schema, model, Document} from "mongoose";


interface userInterface extends Document {
    nome: string;
    email: string;
    senha: string;
    perfil_foto: string;
    cargo?: string;
    passwordResetToken?: string;
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
    }
})

export default model<userInterface>('User', UserSchema);