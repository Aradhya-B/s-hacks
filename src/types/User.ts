import {Bill} from './Bill'
import {Payee} from './Payee';

export interface User {
  email: string,
  scotia_id: number,
  name: string,
  bills: Bill[],
  payee: Payee
}
