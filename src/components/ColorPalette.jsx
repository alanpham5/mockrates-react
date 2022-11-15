import React from 'react';
import "./ColorPalette.css"


export function ColorPalette({primary, secondary, tertiary=undefined}){
    return(
        <>
            <span className="color" style={{backgroundColor: primary}}></span>
            <span className="color" style={{backgroundColor: secondary}}></span>
            {tertiary && <span className="color" style={{backgroundColor: tertiary}}></span>}
        </>
    )
}
