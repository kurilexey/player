const initialState = {};

export default function enteredPage (state = initialState, action){
    switch (action.type) {
        case "SAVE_FILE_OBJECT":
            return  action.payload;

        default:
            return state;
    }
}