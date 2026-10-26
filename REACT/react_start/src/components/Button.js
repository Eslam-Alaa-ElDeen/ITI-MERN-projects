import "../style/button.css"

export const Button=({title,children})=>{
    return(
        <div className={"buttonDiv"}>
            <button className="button">{title}{children}</button>
            
        </div>
    )
}