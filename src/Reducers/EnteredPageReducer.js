const initialState = "";

export default function enteredPage (state = initialState, action){
    switch (action.type) {
        case "SAVE_NAME_PAGE":
            return  action.payload;
        
        default:
            return state;
    }
}