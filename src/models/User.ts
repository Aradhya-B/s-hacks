import mongoose, {Schema, Document} from 'mongoose':
import {Bill} from './Bill.ts';
import {Payee} from './Payee.ts';

interface User {
  email: string,
  scotia_id: string,
  name: string,
  bills: Bill[],
  payees: Payee[],
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
    type: Array<Bill>
  },
  payees: {
    type: Array<Payee>
  },
})

export default mongoose.model<User>('User', UserSchema);
