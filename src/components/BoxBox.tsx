import React from 'react';

const directions = {
    "nw": ["0px", "0px"],
    "n": ["50%", "0px"],
    "ne": ["100%", "0px"],
    "e": ["100%", "50%"],
    "se": ["100%", "100%"],
    "s": ["50%", "100%"],
    "sw": ["0px", "100%"],
    "w": ["0px", "50%"]

}

function BoxBox({direction}: {direction: string}) {
    return (
        <div className={"resize"} id={"resize" + direction} style={
            {
                position: "absolute",
                // left and top are relative to parent
                // @ts-ignore
                left: directions[direction][0],
                // @ts-ignore
                top: directions[direction][1],

                zIndex: 2000,

                transform: "translate(-50%, -50%)",
                width: "10px",
                height: "10px",
                borderWidth: "2px",
                borderColor: "transparent",
                borderStyle: "solid",
                userSelect: "none",
                cursor: direction + "-resize",
                backgroundColor: "red"

            }
        }/>    );
}

export default BoxBox;