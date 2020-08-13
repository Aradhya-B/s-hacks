import {model, Schema, Document} from 'mongoose';

export interface IBill extends Document {
  amount: number,
  due_date: Date,
  payee_id: string,
  routing_number: string,
  description: string,
  date_received: Date,
  paid_date: Date,
}

export const BillSchema: Schema = new Schema({
  amount: {
    type: Number,
  },
  due_date: {
    type: Date,
  },
  payee_id: {
    type: String,
  },
  routing_number: {
    type: String,
  },
  description: {
    type: String,
  },
  date_received: {
    type: Date,
  },
  paid_date: {
    type: Date,
  },
})

export default model<IBill>('Bill', BillSchema);
