import {Bill} from '../types/Bill';

let bills: Bill[];

const getBills = ({response}: {response: any}) => {
  response.body = {
    success: true,
    data: bills,
  };
};

const addBill = async ({request, response}): {request: any, response: any} => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: 'The request body is empty',
    };
  } else {
    const bill: Bill = body.value
  }
}
