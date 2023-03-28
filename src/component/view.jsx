import React, {useState} from 'react';


const View = () => {

    const [history, setHistory] = useState([]);
    const [Calc, setCalc] = useState("");
    const [Result, setResult] = useState("");
    const operator = ['-', '+', '/', '*', '%', '.']

    const createnumber = () => {
        const numbers = [];

        for (let i = 1; i < 10; i++) {
            numbers.push(
                <button onClick={() => updateCalc(i.toString())} className="btn" key={i}>{i}</button>
            )
        }
        return numbers;
    }

    function updateCalc(value) {
        if (operator.includes(value) && Calc === "" || operator.includes(value) && operator.includes(Calc.slice(-1))) {
            return;
        }
        setCalc(Calc + value)
        if (!operator.includes(value)) {
            setResult(eval(Calc + value).toString());
        }
    }

    function Calculate() {
        if (Calc !== history[0]) {
            setHistory(prev => [Calc, ...prev])
        }
        setCalc(eval(Calc).toString());
        setResult("")
    }

    function Delete() {
        if (Calc === "") {
            setResult("")
            setHistory([])
        } else {
            setCalc(Calc.slice(0, -1))
            setResult(Calc.slice(0, -1))
        }
    }


    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex flex-col text-white text-6xl self-end justify-center items-end sm:self-center sm:w-[22rem]">
                {/*display*/}
                    <p>{Result ? <span className="text-3xl text-gray-500">({Result})</span> : ""} {Calc || "0"}</p>
                    {history[0] ? <span className="text-3xl mt-5">{history[0]}</span> : ""}
                    {history[1] ? <span className="text-3xl mt-2">{history[1]}</span> : ""}
                    {history[2] ? <span className="text-3xl mt-2">{history[2]}</span> : ""}
                {/*end display*/}
            </div>

            <div className="flex-1 flex w-full justify-center items-center gap-2 ">
                {/*operator*/}
                <div className="grid grid-cols-2 grid-rows-4 gap-2 order-1">
                    <button onClick={() => updateCalc("-")} className="btn operator">-</button>
                    <button onClick={() => updateCalc("/")} className="btn operator">/</button>
                    <button onClick={() => updateCalc("+")} className="btn row-span-2 operator h-auto">+</button>
                    <button onClick={() => updateCalc("*")} className="btn operator">x</button>
                    <button onClick={() => updateCalc("%")} className="btn operator">%</button>
                    <button onClick={Calculate} className="btn col-span-2 equal w-auto">=</button>
                </div>
                {/*end operator*/}

                {/*numbers*/}
                <div className="grid grid-cols-3 grid-rows-4 gap-2">
                    {createnumber()}
                    <button onClick={() => updateCalc("0")} className="btn">0</button>
                    <button onClick={() => updateCalc(".")} className="btn">.</button>
                    <button onClick={Delete} className="btn">C</button>
                </div>
                {/*end numbers*/}
            </div>
        </div>
    );
}

export default View;