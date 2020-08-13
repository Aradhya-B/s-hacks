import mongoose, {Schema, Document} from 'mongoose':

export interface Bill extends Document {
  amount: number,
  due_date: Date,
  payee_id: string,
  routing_number: string,
  description: string,
  date_received: Date,
  paid_date: Date,
}

const BillSchema: Schema = new Schema({
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

export default mongoose.model<Bill>('Bill', BillSchema);
