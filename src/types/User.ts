import Bill from './Bill.ts';
import Payee from './Payee.ts';

export default interface User {
  email: string,
  scotia_id: number,
  name: string,
  bills: Bill[],
  payee: Payee[],
}
