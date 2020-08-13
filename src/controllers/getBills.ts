import Bill from '../types/Bill.ts';

let bills: Bill[];

const getBills = ({response}: {response: any}) => {
  response.body = {
    success: true,
    data: bills,
  };
  console.log('Hello bills');
};

export default getBills;
