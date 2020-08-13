import {IBill} from '../models/Bill';

let bills: Array<IBill>;

const getBills = ({response}: {response: any}) => {
  response.body = {
    success: true,
    data: bills,
  };
  console.log('Hello bills');
};

export default getBills;
