import uuidv1 from 'uuid/v1';

const example = {
  name: 'Stu',
  position: 'C',
  throws: 'L',
  bats: 'L',
  team: 'Dodgers',
  _id: 1,
  __v: 3,
};

const initialState = {
  list: [example],
  active: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('PAYLOAD:', payload, 'TYPE:', type);

  let record, updated;
  switch (type) {
    case 'GET':
      record = state.list.find(record => record._id === payload);
      return Object.assign({ ...state, active: record });
    // Update a resource
    case 'PATCH':
      record = state.list.find(record => record._id === payload._id);
      updated = Object.assign({}, record, payload);
      return Object.assign({ ...state, list: [...state.list, updated] });
    case 'POST':
      if (!payload._id) {
        payload._id = uuidv1();
      }
      if (!payload.__v) {
        payload.__v = uuidv1();
      }
      return Object.assign({}, state, { list: [...state.list, payload] });
    // Replace a resource
    case 'PUT':
      record = state.list.find(record => record._id === payload._id);
      updated = Object.assign({}, record, payload);
      return Object.assign({ ...state, list: [...state.list, updated] });

    case 'DELETE':
      updated = state.list.filter((record, index) => record._id !== payload);
      return Object.assign({}, state, { list: updated });
    default:
      return state;
  }
};
