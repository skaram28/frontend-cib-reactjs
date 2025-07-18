import { combineReducers } from '@reduxjs/toolkit';
import portfolioSlice from '../slices/portfolioSlice';
import transactionSlice from '../slices/transactionSlice';
import loginSlice from '../slices/loginSlice';
import fundSlice from '../slices/fundSlice';
import fetchFundByIdSlice from '../slices/fetchFundByIdSlice';
import kycSlice from '../slices/kycSlice';
// import registerReducer from '../redux/registerSlice';

const rootReducer = combineReducers({
//   register: registerReducer
    portfolio:portfolioSlice,
    transaction:transactionSlice,
    login:loginSlice,
    fund:fundSlice,
    fetchFundById:fetchFundByIdSlice,
    kyc:kycSlice


  
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
