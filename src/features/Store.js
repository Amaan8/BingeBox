import { configureStore } from "@reduxjs/toolkit";
import  userReduce from "./Slice";

export default configureStore({
    reducer : {
        user: userReduce
    },
});