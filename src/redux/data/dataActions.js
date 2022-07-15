// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {

    const blockchain = store
        .getState()
        .blockchain
    let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
    let paused = await store
        .getState()
        .blockchain.smartContract.methods.paused()
        .call();
    let maxMintAmount = await store
        .getState()
        .blockchain.smartContract.methods.maxMintAmount()
        .call();
    let whitelistMintedAmount = await store
        .getState()
        .blockchain.smartContract.methods.whitelistMintedAmount(blockchain.account)
        .call()
    let whitelistUserAmount = await store
        .getState()
        .blockchain.smartContract.methods.whitelistUserAmount(blockchain.account)
        .call()
    let onlyWhitelisted = await store
        .getState()
        .blockchain.smartContract.methods.onlyWhitelisted()
        .call()
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          paused,
          maxMintAmount,
          whitelistMintedAmount,
          whitelistUserAmount,
          onlyWhitelisted,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
