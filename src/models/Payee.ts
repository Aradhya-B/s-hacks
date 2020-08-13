import {Schema, Document, model} from 'mongoose';

export interface IPayee extends Document {
  account_number: string,
  name: string,
  last_paid_date: Date,
  last_paid_value: number,
}

export const PayeeSchema: Schema = new Schema({
  account_number: {
    type: String
  },
  name: {
    type: String
  },
  last_paid_date: {
    type: Date
  },
  last_paid_value: {
    type: Number
  },
})

export default model<IPayee>('Payee', PayeeSchema);
