export default interface Bill {
  amount: number,
  due_date: Date,
  payee_id: number,
  routing_number: number,
  description: string,
  date_received: Date,
  paid_date: Date,
};
