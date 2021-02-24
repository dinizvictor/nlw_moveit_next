import { useState } from 'react' //Hook do React (Funcionalidade que lida com infos dinâmicas ao longo do tempo)

interface ButtonProps {

    color: string;
    children: string; //<Componente> CHILDREN </Componente>

}

export function Button(props: ButtonProps) {

    const [counter, setCounter] = useState(1); //Cada componente botão possui seu estado (useState).

    function increment() { //Função de incremento de valor.

        setCounter(counter + 1);
        //React usa imutabilidade para facilitar a identificação de alterações no valor de variáveis
        //Isso impossibilita que o valor de uma variável seja alterado. Nesse caso, um novo valor
        //é fornecido para setCounter ao invés de incrementarmos counter.

    }

    return (
        <button

            type="button"
            onClick={increment}
            style={{ backgroundColor: props.color }}> {/* Propriedade cor - Cor do botão */}
            {props.children} <strong>{counter}</strong> {/* Propriedade cor - Nome do botão */}

        </button>
    );

}