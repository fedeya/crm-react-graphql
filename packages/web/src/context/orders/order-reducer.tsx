export interface State {}

type Action = {
  type: string;
  payload: any;
};

export default (state: State, action: Action): State => {
  switch (action.type) {
    default:
      return state;
  }
};
