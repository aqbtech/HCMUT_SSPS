import { combineReducers, createStore } from "redux"
const allReducers = combineReducers({
    })
// Hàm tải dữ liệu vào
const saveUserData = (state) => {
    try{
        if(state.account){
            localStorage.setItem("userData", JSON.stringify(state.account));
        }
    }catch(e){
        console.error(e);
    }
}

// hàm lấy dữ liệu ra
const loadUserData = () => {
    try{
        const userData = localStorage.getItem("userData");
        if(userData){
            return userData
        }
        return undefined;
    }catch(e){
        console.error(e);
        return undefined;
    }
}

const prevStart = loadUserData();

const store = createStore(allReducers, prevStart);

store.subscribe(() => saveUserData(store.getState()));
export default store;