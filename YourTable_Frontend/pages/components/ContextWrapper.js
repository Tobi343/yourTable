import ColorContext from "../contexts/ColorContext";
import { useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function ContextWrapper({children,session}){

    const [color,setColor] = useState("bg-blue-500")

    return(

        <ColorContext.Provider value={{color,setColor}}>
            {children}
        </ColorContext.Provider>
    )

}

export default ContextWrapper