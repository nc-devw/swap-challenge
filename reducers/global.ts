import { initialTransaction } from "@/context/global";
import { AppContext } from "@/context/types.d";
import { actionType, swapActions } from "./index.d";

const reducer = (state: AppContext, action: swapActions): AppContext => {
  switch (action.type) {
    case actionType.SWAP_ASSETS:
      const indexInput = state.assets.findIndex(
        (asset) => asset.symbol === action.payload?.input?.symbol
      );

      const newObjectInput = {
        symbol: state.assets[indexInput].symbol,
        quantity:
          state.assets[indexInput].quantity - action.payload.input.quantity,
      };

      const indexOutput = state.assets.findIndex(
        (asset) => asset.symbol === action.payload?.output?.symbol
      );

      const newObjectOutput = {
        symbol: state.assets[indexOutput].symbol,
        quantity:
          state.assets[indexOutput].quantity + action.payload.output.quantity,
      };

      const assets = [...state.assets];

      assets[indexInput] = newObjectInput;
      assets[indexOutput] = newObjectOutput;

      return {
        ...state,
        assets: [...assets],
      };
    case actionType.CREATE_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    case actionType.CANCEL_TRANSACTION:
      return {
        ...state,
        transaction: { ...initialTransaction },
      };
    case actionType.ADD_TRANSACTION:
      const transactions = [
        ...state.transactions,
        { ...state.transaction, date_created: action.payload.date_created },
      ];

      return {
        ...state,
        transaction: { ...initialTransaction },
        transactions: transactions,
      };
    default:
      return state;
  }
};

export default reducer;
