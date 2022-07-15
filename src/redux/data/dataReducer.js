const initialState = {
  loading: false,
  totalSupply: 1000,
  maxMintAmount: 10,
  whitelistMintedAmount: 5,
  whitelistUserAmount: 7,
  onlyWhitelisted: false,
  paused: true,
  cost: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        maxMintAmount: action.payload.maxMintAmount,
        whitelistMintedAmount: action.payload.whitelistMintedAmount,
        whitelistUserAmount: action.payload.whitelistUserAmount,
        onlyWhitelisted: action.payload.onlyWhitelisted,
        paused: action.payload.paused,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
