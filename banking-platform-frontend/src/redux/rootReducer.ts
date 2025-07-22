import { combineReducers } from '@reduxjs/toolkit';
import portfolioSlice from '../slices/portfolioSlice';
import transactionSlice from '../slices/transactionSlice';
import loginSlice from '../slices/loginSlice';
import fundSlice from '../slices/fundSlice';
import fetchFundByIdSlice from '../slices/fetchFundByIdSlice';
import kycSlice from '../slices/kycSlice';
import auditSlice from '../slices/auditSlice';
import userSlice from '../slices/userSlice';
import registerSlice from '../slices/registerSlice';

const rootReducer = combineReducers({
    portfolio:portfolioSlice,
    transaction:transactionSlice,
    login:loginSlice,
    fund:fundSlice,
    fetchFundById:fetchFundByIdSlice,
    kyc:kycSlice,
    audit:auditSlice,
    userId:userSlice,
    register:registerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
