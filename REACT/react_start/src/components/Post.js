import "../style/post.css"
export const Post=({title,body})=>{
    return(
        <div className={"postStyle"}>
            <h1>{title}</h1>
            <hr></hr>
            <p>
                {body}
            </p>
        </div>
    )
}