import React, { useContext, useEffect, useState } from "react";
import { userContext } from "./StateControl";
import { useNavigate } from "react-router";
import sub from './Subjects.json'

function Options() {
    const {state, dispatch} = useContext(userContext)
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState({})
    const toggleEditBtn = (id) => {
        setIsEdit((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
        

    }
    const getYear = (event, item) =>{
        dispatch({type: 'chosen_year', 
            payload:{id: item.id, selected_year: event.target.value}
            
        })
    }

    const addedSubjects = (e, item) =>{
        const ischecked = e.target.checked
        if (ischecked) {
            dispatch({type: 'subjects_added', 
                payload:{
                    id: item.id,
                    subject: item.subject,
                    year: item.year,
                    que: item.que,
                    selected_year: item.year[0],
                    selected_no: item.que[0]
                    
                }
            })
            
        }else{
            dispatch({type:'subject_removed', 
                payload: {
                    id: item.id
                }
            })
        } 
    }

    const getNum = (e, item) =>{
        dispatch({type: 'select-num',
            payload: {
                id: item.id,
                selected_no: e.target.value
            }
        })

    }

  
    useEffect(()=>{
        console.log(state.chosenSubjects)
    }, [state])

    function increaseTime(){
        dispatch({type: 'increment'})
    }
    function decreaseTime(){
        dispatch({type: 'decrement'})
    }

    return ( 
        <div className="h-full w-full">
            <div className="w-[80%] h-[80vh] mx-auto py-8 mt-10 shadow-black bg-gray-100">
                <div className="bg-white w-[80%] h-[70vh] mx-auto">
                    <div className="flex justify-between items-center font-medium text-xl pr-2 text-white bg-green-500 w-full h-14">
                        <h3 className="flex w-full justify-center">Practice for UTME</h3>
                        <svg onClick={() => navigate('/')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" className="size-6 fill-white stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0
                         .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0
                          1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <div className="hr flex justify-center font-[400] py-2">
                        <h3>Select One Or More Subjects</h3>
                    </div>
                    <div className="subject_opt text-base grid px-6 w-full items-center grid-cols-7 h-24 overflow-x-auto">
                        {sub.subjects.map((item) =>(
                            <div className="" key={item.id}>
                                <div className="flex gap-1">
                                    <input onChange={(e) => addedSubjects(e, item)} type="checkbox" name={item.subject} value={item.subject} />
                                    <h4>{item.subject}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 w-full">
                        <div className="partion w-80 mx-4 h-80 overflow-auto">
                            <div className="chosenSubjects flex-col">
                                {state.chosenSubjects.map((item) =>(
                                    <div key={item.id} className="subject h-[11vh] py-2 w-fit bg-green-500 border-b-8 border-x-white flex-col">
                                        <div className="flex gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="size-6  stroke-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                            <h2 className="text-lg font-[500] text-gray-100">{item.subject}</h2>
                                        </div>
                                        <div className="flex flex-nowrap px-2 relative text-white justify-between">
                                            {isEdit[item.id] ? (
                                                <div className="flex gap-2 px-2 text-base font-[400] items-center">
                                                    <select onChange={(e) =>getYear(e, item)} className="flex justify-center outline-none bg-gray-300 text-black font-medium" name="" id="">
                                                       {item.year.map((year, index) => (
                                                        <option key={index} value={year}>{year}</option>
                                                       ))}
                                                    </select>
                                                    <h3>Model</h3>
                                                    |
                                                    <select onChange={(e) => getNum(e, item)} className="bg-gray-300 text-black" name="" id="">
                                                        {item.que.map((num, index) => (
                                                            <option key={index} value={num}>{num}</option>
                                                        ))}
                                                    </select>
                                                    <h3>Questions</h3>
                                                </div>
                                            ):  <p className="px-5">{item.selected_year} Model | {item.selected_no} questions</p>}
                                            <button onClick={() => toggleEditBtn(item.id)} className="w-10 flex justify-center hover:bg-slate-200 items-center rounded-xl text-sm font-normal bottom-3 h-10  text-black bg-white">
                                                {isEdit[item.id] ? 'Save' : 'Edit'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-col w-78 h-[42vh] py-6 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg"fill="none" 
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="size-6 w-40 h-40 fill-green-500 stroke-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 
                            0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <div className="flex items-center justify-start px-2 w-[80%] font-[500] mt-2 h-10 bg-gray-300">
                                {state.username.toUpperCase()}
                            </div>
                            <div className="h-12 w-[50%] mt-3">
                                <button className="bg-blue-600 text-white text-lg font-[500] hover:bg-blue-300 rounded-2xl w-full h-full">Get Started</button>
                            </div>
                        </div>
                        <div className="flex-col w-full place-items-center items-center py-6 h-full ">
                            <div className="line flex justify-center w-full font-[500]">
                                <h3>Mode</h3>
                            </div>
                            <div className="flex justify-center items-center w-full h-14">
                                <select className="flex justify-center w-72 font-semibold outline-none items-center text-sm h-10 bg-gray-200" name="" id="">
                                    <option value="practice">Practice</option>
                                    <option value="real_exam">Get timed, <br />view result and get correction</option>
                                </select>
                            </div>
                            <div className="flex w-full justify-center items-center time">
                                <h3>Total Time</h3>
                            </div>
                            <div className="flex justify-between items-center rounded bg-white border-2 border-x-gray-400 border-y-gray-400 time-selector w-60 h-9">
                                <div className="flex w-full justify-between">
                                    <h3 className="px-2 font-[400]">0{state.timer}:00:00</h3>
                                    <div className="flex-col place-items-center">
                                        <button onClick={increaseTime} className="flex justify-center items-center w-4 h-4 shadow bg-slate-400 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-2 h-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </button>
                                        <button onClick={decreaseTime} className="flex justify-center items-center rounded shadow bg-gray-400 w-4 h-4 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-2 h-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center shuffle w-full items-center py-1 font-[400]">
                                <h3>Shuffle</h3>
                            </div>
                            <div className="flex justify-between w-56 text-lg font-[400]">
                                <div className="flex gap-1">
                                    <input type="checkbox" name="" id="" />
                                    <h3>Questions</h3>
                                </div>
                                <div className="flex gap-1">
                                    <input type="checkbox" name="" id="" />
                                    <h3>Options</h3>
                                </div>

                            </div>
                            <div className="flex justify-center w-full text-[400] items-center py-2 ins">
                                <h3>Instructions</h3>
                            </div>
                            <div className="btn flex justify-center items-center text-gray-100 text-lg py-2 w-[70%] h-14">
                                <button className="flex w-full h-full justify-center rounded-3xl items-center bg-green-500">Check To View</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Options;