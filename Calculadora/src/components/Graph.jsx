import { Graphviz } from "graphviz-react";

function Graph({nodes}) {
    console.log(nodes)
    return ( 
        <Graphviz 
        dot={`
            digraph g {
                ${nodes.map((node, index) => {
                    if (index < nodes.length - 1) {
                        return `"${node}" -> "${nodes[index + 1]}"`;
                    } else {
                        return '';
                    }
                }).join('\n')}
            }
        `} 
        options={{ width: 200, height: 200 }} />
    );
}

export default Graph;