import React, { useState } from 'react';
import { Graph } from 'react-d3-graph';

const Calculator = () => {
  const [operation, setOperation] = useState('');
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const handleOperation = (op) => {
    setOperation(op);
    // Procesar la operación para obtener los operandos y el resultado
    const operands = op.split(/[+\-*\/]/);
    const result = eval(op); // Evaluar la operación para obtener el resultado

    // Construir los datos del grafo
    const newNodes = operands.map((operand, index) => ({ id: `Operand ${index}`, label: operand }));
    const newLinks = newNodes.map((node, index) => ({ source: `Operand ${index}`, target: 'Result' }));
    const newResultNode = { id: 'Result', label: `Result: ${result}` };

    setGraphData({ nodes: [...newNodes, newResultNode], links: [...newLinks] });
  };

  return (
    <div>
      <h2>Calculator</h2>
      <input value={operation} onChange={(e) => setOperation(e.target.value)} />
      <button onClick={() => handleOperation(operation)}>Calculate</button>
      <Graph
        id="calculator-graph"
        data={graphData}
        config={{ nodeHighlightBehavior: true }}
      />
    </div>
  );
};

export default Calculator;
