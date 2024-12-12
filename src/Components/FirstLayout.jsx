import React, { useContext, useEffect, useRef, useState } from "react";
import hide from '../Components/hide.png'
import view from '../Components/view.png'
import { userContext } from "./StateControl";
import { useNavigate } from "react-router";

function FirstLayout() {
    const {state, dispatch} = useContext(userContext)
    const [showInfo, setShowInfo] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const removeRef = useRef(null)
    const navigate = useNavigate()
    function togglePassword(){
        dispatch({type: 'togglePassword'})       
    }
    function userInputs(e){
        dispatch({type:'set_inputs', payload: e.target.value})
    }
    function passwordInputs(e){
        dispatch({type:'set_password', payload:e.target.value})
    }

    useEffect(() => {
        setTimeout(() => {
            setShowInfo(false)

        }, 5000)
    }, [])
   function submitData() {
    if (state.username.trim() ==='' || state.password.trim() === '') {
        alert('Please do not leave any field empty')
        
    }else{
        if (removeRef.current) {
            removeRef.current.remove();
            setIsAuth(true)
            setTimeout(() =>{
                navigate('/options')
                dispatch({type:'refresh'})
            }, 6000)
            
        }
        
    }
   }
    return (
        <div className="w-full h-full bg-gray-300">
            <div className="flex items-center justify-center py-8 w-full h-full]">
                <img className=" h-full w-10/12" src="jambite.png" alt="jamb" />
            </div>
            <div className="user-input right-[40%] absolute top-[60%] w-[30%]" ref={removeRef}>
                <div className="user-name flex gap-2">
                    <label className="text-white font-[500] text-lg" htmlFor="">Username:</label>
                    <input onChange={userInputs} value={state.username} className="w-[100%] px-2 h-9" type="text" placeholder="Enter your username"/>
                </div>
                <div className="password py-8 relative flex gap-2">
                    <label className="font-[500] text-white text-lg" htmlFor="">Password:</label>
                    <input onChange={passwordInputs} value={state.pasword} className="w-[99%] px-2 h-9 " type={`${state.showPass ? 'text': 'password'}`} placeholder="Enter your password"/>
                    <img onClick={togglePassword} className="absolute h-5 w-5 right-6 mt-2" src={state.showPass ? view : hide} alt="hide password" />
                </div>
                <div className="w-full absolute left-[35%]">
                    <button onClick={submitData} className="flex justify-center items-center text-white hover:bg-green-300 font-[500] text-lg rounded-3xl bg-green-500 h-9 w-[50%]">Submit</button>
                </div>
            </div>
            <div className={`absolute ${!showInfo ? 'transition delay-100 ease-out scale-0' : 'transition delay-100 ease-in scale-100'} flex justify-center items-center text-sm font-[500] rounded-xl w-4/12 h-16 bg-white top-[40%] right-[38%]`}>
                <h2>You can enter with any username or password of your choice</h2>
                <svg onClick={() => setShowInfo(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute hover:transition-all hover:scale-110 top-1 right-2 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>


            </div>
            {isAuth && (
                <div className="flex gap-[5px] absolute top-[80%] text-xl font-bold text-white right-[45%]">
                    <h2>In a moment please</h2>
                    <div className="dot flex gap-1">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}
        </div>
     );
}

export default FirstLayout;