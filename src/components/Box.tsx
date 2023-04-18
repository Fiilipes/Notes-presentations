import React, {useEffect, useRef} from 'react';
import BoxBox from "./BoxBox";
let startX = 0;
let startY = 0;

let startClientX = 0;
let startClientY = 0;

let resizeDirection = "";

function Box({name}: { name: string }) {

    const ref = useRef(null);
    const refText = useRef(null);
    const boxDiv = useRef(null);

    useEffect(() => {
        const element = ref.current as unknown as HTMLElement;
        const elementText = refText.current as unknown as HTMLElement;
        const resizeBoxes = document.getElementsByClassName("resize");
        const resizeBoxesDiv = document.getElementsByClassName("boxDiv");

        const box = boxDiv.current as unknown as HTMLElement;


        function handleMouseDown(event: MouseEvent) {
            console.log(resizeBoxesDiv)
            Array.from(resizeBoxesDiv).forEach((element) => {
                // @ts-ignore
                element.style.display = "none";
            })

            box.style.display = "block";
            // ... your code for mousedown event


            console.log(elementText.getBoundingClientRect())
            console.log(resizeBoxes)
            resizeDirection = "";
            // check if mouse isnt in each resize boxs getBoundingClientRect()
            for (let i = 0; i < resizeBoxes.length; i++) {
                // @ts-ignore
                if (event.clientX > resizeBoxes[i].getBoundingClientRect().left && event.clientX < resizeBoxes[i].getBoundingClientRect().right && event.clientY > resizeBoxes[i].getBoundingClientRect().top && event.clientY < resizeBoxes[i].getBoundingClientRect().bottom) {
                    console.log("inside resize box")

                    // set resize direction
                    resizeDirection = resizeBoxes[i].id.replace("resize", "");


                }
            }



            // check if the click is inside the text
            if (event.clientX > elementText.getBoundingClientRect().left && event.clientX < elementText.getBoundingClientRect().right && event.clientY > elementText.getBoundingClientRect().top && event.clientY < elementText.getBoundingClientRect().bottom) {
                console.log("inside text")
                return;
            }

            // remove select on text
            window.getSelection()?.removeAllRanges();


            console.log('Mouse down -----------------');
            console.log(name)

            // elements position in relation to parent
            // @ts-ignore
            console.log("Offset from LEFT:   " +element.style.left.replace("px", ""));
            // @ts-ignore
            console.log("Offset from TOP:    " +element.style.top.replace("px", ""))
            console.log("Height:             " +element.style.height);
            console.log("Width:              " +element.style.width);
            console.log("Border width:       " +element.style.borderWidth);

            console.log(event.clientX, event.clientY)

            startClientX = event.clientX;
            startClientY = event.clientY;


            element.parentElement?.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            function handleMouseMove(event: MouseEvent) {

                if (resizeDirection === "") {
                    element.style.left = (parseInt(element.style.left.replace("px", "")) + event.clientX - startClientX) + "px";
                    element.style.top = (parseInt(element.style.top.replace("px", "")) + event.clientY - startClientY) + "px";
                    startClientX = event.clientX;
                    startClientY = event.clientY;

                }

            }

            function handleMouseUp(event: MouseEvent) {
                // ... your code for mouseup event
                console.log('Mouse up -----------------');
                console.log(name)

                // elements position in relation to parent
                // @ts-ignore
                console.log("Offset from LEFT:   " +element.style.left.replace("px", ""));
                // @ts-ignore
                console.log("Offset from TOP:    " +element.style.top.replace("px", ""))
                console.log("Height:             " +element.style.height);
                console.log("Width:              " +element.style.width);
                console.log("Border width:       " +element.style.borderWidth);

                console.log(event.clientX, event.clientY)

                console.log("Difference:")
                console.log(event.clientX - startClientX, event.clientY - startClientY)

                if (resizeDirection === "") {
                    element.style.left = (parseInt(element.style.left.replace("px", "")) + event.clientX - startClientX) + "px";
                    element.style.top = (parseInt(element.style.top.replace("px", "")) + event.clientY - startClientY) + "px";
                } else if (resizeDirection === "n") {
                    // @ts-ignore
                    console.log(parseInt(element.style.top.replace("px", "")) + event.clientY - startClientY)
                    // @ts-ignore
                    console.log(parseInt(element.style.height.replace("px", "")) - event.clientY + startClientY)
                    if (parseInt(element.style.height.replace("px", "")) - event.clientY + startClientY > 0) {
                        element.style.top = (parseInt(element.style.top.replace("px", "")) + event.clientY - startClientY) + "px";
                        element.style.height = (parseInt(element.style.height.replace("px", "")) - event.clientY + startClientY) + "px";
                    } else {
                        element.style.height = Math.abs(parseInt(element.style.height.replace("px", "")) - event.clientY + startClientY) + "px";
                        element.style.top = parseInt(element.style.top.replace("px", "")) + Math.abs(parseInt(element.style.height.replace("px", "")) - event.clientY + startClientY) + "px"
                    }
                }

                element.parentElement?.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }


        }


        element.addEventListener('mousedown', handleMouseDown);

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
        };


    }, [])

    return (
        <div ref={ref} className={"box"} style={
            {
                position: "absolute",
                // left and top are relative to parent
                left: "50px",
                top: "50px",
                padding: ".1vw",
                width: "60px",
                height: "60px",
                borderWidth: "2px",
                borderColor: "blue",
                borderStyle: "solid",
                userSelect: "none",


            }
        }>

            <div ref={boxDiv} className={"boxDiv"}>

                {/*small boxes on border to resize*/}

                <BoxBox direction={"nw"}/>
                <BoxBox direction={"n"}/>
                <BoxBox direction={"ne"}/>
                <BoxBox direction={"e"}/>
                <BoxBox direction={"se"}/>
                <BoxBox direction={"s"}/>
                <BoxBox direction={"sw"}/>
                <BoxBox direction={"w"}/>

            </div>

            <div contentEditable={true} ref={refText} className={"w-fit outline-none p-[0.1vw] m-[0.1vw] absolute"} style={
                {
                    zIndex: 1000,
                    maxWidth: "100%",
                }
            }>
            {name}
            </div>
        </div>
    );
}

export default Box;