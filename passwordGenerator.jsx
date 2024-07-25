import { useCallback, useEffect, useRef, useState } from "react";
import './passwordGenerator.css';
export default function PasswordGenerator() {
    const [length, setlength] = useState(8);
    const [number, setnumber] = useState(false);
    const [specialcharacter, setspecialcharacter] = useState(false);
    const [password, setpassword] = useState();
    const [copy, setcopy] = useState("");
    const passwordref = useRef(null)

    const passwordGenerator = useCallback(() => {
        let password = "";
        let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (number) str += "0123456789";
        if (specialcharacter) str += "@#$&%";
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            password += str.charAt(char);
         }
        setpassword(password);
}, [length, number, specialcharacter, setpassword])
    const copypasswordToClicp = useCallback(() => {
        passwordref.current?.select()
        window.navigator.clipboard.writeText(password);

    }, [password])

    useEffect(() => {
        passwordGenerator()
    }, [length, number, specialcharacter, setpassword]);
    return (
        <div className="outer">
            <h1>Generate Password</h1>
            <div className="password1">
                <input type="text" value={password}
                    className="takeinput" placeholder="password"
                    ref={passwordref} readOnly />&nbsp;
                <button onClick={copypasswordToClicp}
                       style={{
                        backgroundColor: 'black',
                        width: '70px', // Adjust the width as needed
                        height: '30px', // Adjust the height as needed
                        fontSize: '12px' // Adjust the font size as needed
                    }}>COPY</button>
            </div>
            <div className=" values">
                <div>
                    <input type="range" min={5} max={50} value={length}
                        onChange={(e) => (setlength(e.target.value))} />
                    <label >Length:{length}</label>
                </div>
                <div className="number">
                    <input type="checkbox" id="number"
                        defaultChecked={number}
                        onChange={() => (setnumber((prev) => !prev))} />
                    <label htmlFor="number">Number </label>
                </div>
                <div>
                    <input type="checkbox" id="special"
                        defaultChecked={specialcharacter}
                        onChange={() => (setspecialcharacter((prev) => !prev))} />
                    <label htmlFor="special">Special Character</label>
                </div>
            </div>
        </div>


    )
}