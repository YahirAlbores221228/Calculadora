import { useEffect, useRef, useState } from 'react';
import * as math from 'mathjs';
import Graph from './Graph';
import '../assets/styles/styles.css';

function operation() {

    const [display, setDisplay] = useState('');
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const displayRef = useRef(null);
    const [Grapvisible, setGrapvisible] = useState(false);
    const [tokens, setTonkens] = useState([]);

    const handlerClick = (e) => {
        e.preventDefault();
        // Actualiza el valor de 'display' con el valor del botón presionado
        setDisplay(display + e.target.value);
        displayRef.current.focus();
    }

    const clear = (e) => {
        e.preventDefault();
        setDisplay(e.target.value);
        setNodes([]);
        displayRef.current.focus();
        setGrapvisible(false)
        setTonkens([])
    }

    const resultOperation = (e) => {
        e.preventDefault();

        try {

            //definimos una variable que almacenara la operacion a realizar donde incluye los  valores ingresados en "display" en operador
            const token = display.match(/(\d+(\.\d+)?|[\+\-\*\/\(\)])\s*/g);
            // indicamos que si no  hay tokens se devuelve un array vacio y marca error
            if (!token) {
                setDisplay("Error");
                return;
            }

            //Convierte una serie de tokens en un nuevo array de objetos, donde determina si  es un número o operador y guardamos en el estado settokens para hacer el analisis lexico
            const tok = token.map(token => {
                let type;
                switch (token) {
                    case '+':
                        type = 'Suma';
                        break;
                    case '-':
                        type = 'Resta';
                        break;
                    case '*':
                        type = 'Multi';
                        break;
                    case '/':
                        type = 'División';
                        break;
                    default:
                        type = 'Número';
                        break;
                }
                return { type, value: token };
            });
            // Lo guardamos en el estado y ese estado se utiliza en una etiqueta  de JSX para pintar el proceso lexico
            setTonkens(tok);

            //math.evaluate toma una cadena de texto que representa una expresión matemática y devuelve el resultado de evaluar esa expresión. 
            const result = math.evaluate(display);
            //guardamos el resultado en setDisplay para mostrarlo en el input result
            setDisplay(result);
            //de a cuerdo a lo que ahora es display, lo separamos en un array de caracteres 
            const newNodes = display.split('')
            //lo guardamos en nodos
            setNodes(newNodes);
            //con map creamos un nuevo array de links donde por cada elemento del array de nodos creamos un objeto con el nodo anterior como source y el nodo actual como target
            const newLinks = newNodes.map((node, index) => ({ source: newNodes[index - 1], target: node }));
            //lo guardamos en links
            setLinks(newLinks);
            //posicionamos el focus en el input
            displayRef.current.focus();
            //para hacer que aparesca el grafo cuando se necesita mientra es falso esta oculto
            setGrapvisible(true)

        } catch (error) {
            setDisplay("Error")
        }
    }

    useEffect(() => {
        displayRef.current.focus();
    }, []);

    return (
        <>
            <div className='container-calculator'>
                <h1 className='tilte-calculator'>Calculadora de operaciones</h1>
                <div className='calculator-operation'>
                    <input ref={displayRef} type="text" className='input-resultado' value={display} placeholder='0' name='display' />

                    <button className="button-calculator" value='7' onClick={handlerClick}>7</button>
                    <button className="button-calculator" value='8' onClick={handlerClick}>8</button>
                    <button className="button-calculator" value='9' onClick={handlerClick}>9</button>
                    <button className="button-calculator" value='' onClick={clear}>C</button>

                    <button className="button-calculator" value='4' onClick={handlerClick}>4</button>
                    <button className="button-calculator" value='5' onClick={handlerClick}>5</button>
                    <button className="button-calculator" value='6' onClick={handlerClick}>6</button>
                    <button className="button-calculator" value='*' onClick={handlerClick}>x</button>

                    <button className="button-calculator" value='1' onClick={handlerClick}>1</button>
                    <button className="button-calculator" value='2' onClick={handlerClick}>2</button>
                    <button className="button-calculator" value='3' onClick={handlerClick}>3</button>
                    <button className="button-calculator" value='+' onClick={handlerClick}>+</button>

                    <button className="button-calculator" value='0' onClick={handlerClick}>0</button>
                    <button className="button-calculator" value='.' onClick={handlerClick}>.</button>
                    <button className="button-calculator" value='/' onClick={handlerClick}>/</button>
                    <button className="button-calculator" value='-' onClick={handlerClick}>-</button>
                    <button className="button-calculator" value='sqr' onClick={handlerClick}>√</button>

                    <button className="button-calculator" onClick={resultOperation}>=</button>
                </div>
                <div className='container-grafo'>
                    <h1 className='title-arbol'>Arbol de operacion</h1>
                    {Grapvisible && (
                        <Graph nodes={nodes} />
                    )}
                </div>

                <div className='container-lexico'>
                    <h1 className='title-arbol'>Analizador lexico</h1>
                    {tokens.map((token, index) => (
                        <li className='item-position' key={index}>Valor: {token.value}, Tipo: {token.type}</li>
                    ))}
                </div>

            </div>

        </>
    );
}

export default operation;