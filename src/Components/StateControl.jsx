import React, { createContext, useContext, useReducer, useState } from "react";
export const userContext = createContext()
const initials = {
    showPass: false,
    username: '',
    password: '',
    timer: 2,
    chosenSubjects: [],
    
   
}
const reducer = (state, action) =>{
    switch (action.type) {
        case 'togglePassword':
            return{
                ...state,
                showPass: !state.showPass           
            }
        case 'set_inputs':
            return{
                ...state,
                 username: action.payload
            }
        case 'set_password':
            return{
                ...state,
                password: action.payload
            }
        case 'subjects_added':
            return{
                ...state,
                chosenSubjects: [...state.chosenSubjects, {
                    id: action.payload.id,
                    subject: action.payload.subject,
                    year: action.payload.year,
                    que: action.payload.que,
                    selected_year: action.payload.selected_year,
                    selected_no: action.payload.selected_no

                }]
                 
            }

        case 'chosen_year':
            return{
                ...state,
                chosenSubjects: state.chosenSubjects.map((item) =>
                    item.id === action.payload.id
                    ? {...item, selected_year: action.payload.selected_year}
                    : item
                )
            }

        case 'subject_removed':
            let updatedSub = state.chosenSubjects.filter(subject =>subject.id !== action.payload.id)

            return{
                ...state,
                chosenSubjects: updatedSub


            }

        case 'refresh':
            return{
                ...state,
                chosenSubjects: []
            }
        case 'increment':
            return{
                ...state,
                timer: state.timer >=2  ? 2 : state.timer + 1
            }
        case 'decrement':
            return{
                ...state,
                timer: state.timer <= 1 ? 1 : state.timer - 1 
            }
        case 'select-num':
            return{
                ...state,
                chosenSubjects: state.chosenSubjects.map((item) =>
                    item.id === action.payload.id
                    ? {...item, selected_no: action.payload.selected_no}
                    : item
                    
                )
                
                


            }

              
        default:
           return state;
    }

}
function ControlState({children}) {
    const [state, dispatch] = useReducer(reducer, initials)
    return ( 
        <userContext.Provider value={{state, dispatch}}>
            {children}
        </userContext.Provider>

     );
}

export default ControlState;

export const appContext = () => {
    return useContext(userContext)

}