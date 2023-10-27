import { useState,useCallback,useEffect, useRef } from "react"
function App() {
const[length,setlength] = useState(8);
const[numbersallowed,setnumber] = useState(false);
const[charsallowed,setchars] = useState(false);
const[password,setpass] = useState("");

const PasswordRef = useRef(null);

let copyclipboard = useCallback(()=>{

  PasswordRef.current?.select();
  window.navigator.clipboard.writeText(password);
  
},[password]);

let randompassword = useCallback(()=>{
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if(numbersallowed) str+="1234567890";

  if(charsallowed) str+="!@#$%&*?.,";

  for(let i = 1; i<= length ; i++){
    let randomchar = Math.floor(Math.random()*str.length+1);
    let char = str.charAt(randomchar);

    pass+=char;
  }

  setpass(pass);

},[length,numbersallowed,charsallowed,setpass]);

useEffect(randompassword,[length,numbersallowed,charsallowed,setpass]);

  return (
    <>
      <div className="mainbox bg-slate-800 w-full h-52 mt-8 max-w-3xl m-auto rounded-xl flex flex-col items-center pt-4 gap-4">
        <h1 className="text-teal-400 text-3xl font-medium">Password Generator</h1>
        <div className="passline">
          <input type="text"
              className="w-[500px] h-12 outline-none border-none pl-2 "
              value={password}
              readOnly
              ref={PasswordRef}
          />
          <button className="p-3 bg-blue-600 text-white font-semibold hover:bg-blue-400" onClick={copyclipboard}>Copy</button>
        </div>
        <div className="boxes flex gap-24">
          <div className="flex items-center gap-1 ">
            <input type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e)=>{setlength(e.target.value)}}
            />

            <label className="text-white">Length-{length}</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox"
              defaultChecked={numbersallowed} 
              onChange={()=>{setnumber((prev)=>!prev)}}/>
    
            <label className="text-white">Numbers</label>
          </div>

          <div className="flex gap-1">
            <input type="checkbox"
              value={charsallowed} 
              onChange={()=>{setchars((prev)=>!prev)}}/>
    
            <label className="text-white">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App;

