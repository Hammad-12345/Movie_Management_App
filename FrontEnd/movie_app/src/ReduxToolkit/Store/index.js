// store.js
import { configureStore } from "@reduxjs/toolkit";
import ProtectRoutes from "../Slice/StoreToken";
// import UserRoutes from "../slice/ProfileToggle";
// import Userprofileimage from "../slice/Userprofileimage";
// import Cryptoreducer from "../slice/crypto";
// import VerificationProcess from '../slice/verficationmessage'

const store = configureStore({
  reducer: {
    Routes: ProtectRoutes,
    // Userdata: UserRoutes,
    // UserImage: Userprofileimage,
    // Crypto: Cryptoreducer,
    // Verificationstatus:VerificationProcess
  },
});

export default store;
