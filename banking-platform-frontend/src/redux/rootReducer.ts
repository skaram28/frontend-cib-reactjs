import { combineReducers } from '@reduxjs/toolkit';
import portfolioSlice from '../slices/portfolioSlice';
import transactionSlice from '../slices/transactionSlice';
import loginSlice from '../slices/loginSlice';
// import registerReducer from '../redux/registerSlice';

const rootReducer = combineReducers({
//   register: registerReducer
    portfolio:portfolioSlice,
    transaction:transactionSlice,
    login:loginSlice

  
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
