import {Schema, Document, model} from 'mongoose';
import {BillSchema, IBill} from './Bill';
import {PayeeSchema, IPayee} from './Payee';

interface IUser extends Document {
  email: string,
  scotia_id: string,
  name: string,
  bills: IBill[],
  payees: IPayee[],
}

const UserSchema: Schema = new Schema({
  email: {
    type: String
  },
  scotia_id: {
    type: String
  },
  name: {
    type: String
  },
  bills: {
    type: [BillSchema]
  },
  payees: {
    type: [PayeeSchema]
  },
})

export default model<IUser>('User', UserSchema);
