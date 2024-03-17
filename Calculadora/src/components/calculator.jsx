import '../assets/styles/styles.css'
function operation() {
    return (
        <>
            <div className='container-calculator'>
                <h1 className='tilte-calculator'>Calculadora de operaciones</h1>
                <div className='calculator-operation'>
                    <input type="text" className='input-resultado' value="" placeholder='550 + 440' />
                    <button className="button-calculator">7</button>
                    <button className="button-calculator">8</button>
                    <button className="button-calculator">9</button>
                    <button className="button-calculator">C</button>

                    <button className="button-calculator">4</button>
                    <button className="button-calculator">5</button>
                    <button className="button-calculator">6</button>
                    <button className="button-calculator">x</button>

                    <button className="button-calculator">1</button>
                    <button className="button-calculator">2</button>
                    <button className="button-calculator">3</button>
                    <button className="button-calculator">+</button>

                    <button className="button-calculator">0</button>
                    <button className="button-calculator">.</button>
                    <button className="button-calculator">/</button>
                    <button className="button-calculator">-</button>
                    <button className="button-calculator">√</button>
                    <button className="button-calculator">=</button>
                </div>
            </div>
        </>
    );
}

export default operation;