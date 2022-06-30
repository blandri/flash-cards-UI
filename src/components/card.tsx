import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { Card } from "react-bootstrap"
  import React, { useState } from "react";
  import ReactCardFlip from "react-card-flip";
  import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
  import doneIcon from "./doneIcon.svg"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import updateIcon from "./updateIcon.svg"
import { UpdateModal } from "./update_modal"
import { DeleteModal } from "./delete_modal"
import { gql, useMutation } from "@apollo/client";
  
  type Props = {
    title: string;
    details: string;
    categoryName: string;
    id: number;
    done: boolean;
    query: any
  };
  
  const CardDisplay = ({ title,details,categoryName, done, id, query }: Props) => {
    const [flipped, setFlipped] = React.useState<boolean>(false);
  const [smShow, setSmShow] = useState(false);
  const [updateShow,setUpdateShow]=useState(false);
  const [loading,setLoading]= useState(false)

    const handleClick = () => {
      setFlipped(!flipped);
    };

    const MARK_DONE= gql`
  mutation MarkDone($markDoneId: Int!) {
    markDone(id: $markDoneId) {
      id
    }
  }
  `

  const [donee]= useMutation(MARK_DONE,{
    onCompleted:(donee)=>{
      console.log(done)
    },
    refetchQueries:[
      {
        query: query,
        
      }
    ]
  })

  const markDone=async (id:number)=>{
    setLoading(true)
     await donee({
        variables:{
            markDoneId: id
          },
     })
     setLoading(false)
  }
    return (
        <>
      <React.Fragment>
        <ReactCardFlip isFlipped={flipped} flipDirection={"horizontal"}>
        <Card
         
          style={{ width: '30rem', marginTop:"50px",padding:0
        }}
          className="mb-2"
          key={id}
          border={done?"success":"warning"}
        >
          <Card.Header onClick={()=>handleClick()} style={{display:"flex",justifyContent:"space-between"}}>
           <p>{categoryName}</p> 
          <FontAwesomeIcon onClick={async(e)=>{
            // setId(id);
            setSmShow(true)
          }} icon={faCircleXmark} color={done?"rgb(5, 153, 5)":"orange"} style={{ marginTop:"-1.5%", marginRight:"-3%", cursor:"pointer"}}/>
          </Card.Header>
          <Card.Body onClick={()=>handleClick()} style={{
            height: "10%"
          }}>
            <Card.Title style={{
              fontWeight:"700"
            }}>{`Question: ${title}`}</Card.Title>
            
          </Card.Body>
          <Card.Footer style={{
            border:"none",
            background: "linear-gradient(hsl(180, 5%, 100%),hsl(180, 5%, 92%))",
            
          }}>
            <div style={{
              float:"right",
              display:"flex",
              flexDirection:"row",
              alignItems:"flex-end",
            }}>
             <div className="card-text" onClick={() => { setUpdateShow(true) }} style={{
              display:"flex",
              paddingRight:"25px",
              cursor:"pointer"
             }}>
              
             <Card.Text className="card-text" style={{marginBottom: "-2px",paddingRight:"10px"}}>Update</Card.Text>
              <Card.Img src={updateIcon} alt="done" style={{
                width:"20px",
                cursor:"pointer"
              }} />
             </div>
             <div onClick={async e=>{markDone(id)}} className="card-text"  style={{
              display:"flex",
              cursor:"pointer",
              opacity: loading?"0.4":""
             }}>
             <Card.Text className="card-text"  style={{marginBottom: "-2px",paddingRight:"10px"}}>Done</Card.Text>
            {done?(
              <Card.Img src={doneIcon} alt="done" style={{
                width:"20px",
                cursor:"pointer"
              }} />
            ):(
              <FontAwesomeIcon onClick={async()=>{
                
              }} icon={faCircle} size={"lg"} />
            )}
             </div>
            </div>
          </Card.Footer>
        </Card>



        <Card
         
          style={{ width: '30rem', marginTop:"50px",padding:0
        }}
          className="mb-2"
          key={id}
          border={done?"success":"warning"}
        >
          <Card.Header onClick={()=>handleClick()} style={{display:"flex",justifyContent:"space-between"}}>
           <p>{categoryName}</p> 
          <FontAwesomeIcon onClick={async(e)=>{
            setSmShow(true)
          }} icon={faCircleXmark} color={done?"rgb(5, 153, 5)":"orange"} style={{ marginTop:"-1.5%", marginRight:"-3%", cursor:"pointer"}}/>
          </Card.Header>
          <Card.Body onClick={()=>handleClick()} style={{
            height: "10%"
          }}>
            <Card.Text>{`Answer: ${details}`}</Card.Text>
            
          </Card.Body>
          <Card.Footer style={{
            border:"none",
            background: "linear-gradient(hsl(180, 5%, 100%),hsl(180, 5%, 92%))",
            
          }}>
            <div style={{
              float:"right",
              display:"flex",
              flexDirection:"row",
              alignItems:"flex-end",
            }}>
             <div className="card-text" onClick={() => { setUpdateShow(true) }  } style={{
              display:"flex",
              paddingRight:"25px",
              cursor:"pointer"
             }}>
              
             <Card.Text className="card-text" style={{marginBottom: "-2px",paddingRight:"10px"}}>Update</Card.Text>
              <Card.Img src={updateIcon} alt="done" style={{
                width:"20px",
                cursor:"pointer"
              }} />
             </div>
             <div onClick={async e=>{markDone(id)}} className="card-text"  style={{
              display:"flex",
              cursor:"pointer",
              opacity: loading?"0.4":""
             }}>
             <Card.Text className="card-text"  style={{marginBottom: "-2px",paddingRight:"10px"}}>Done</Card.Text>
            {done?(
              <Card.Img src={doneIcon} alt="done" style={{
                width:"20px",
                cursor:"pointer"
              }} />
            ):(
              <FontAwesomeIcon onClick={async()=>{
                
              }} icon={faCircle} size={"lg"} />
            )}
             </div>
            </div>
          </Card.Footer>
        </Card>
        </ReactCardFlip>
      </React.Fragment>
      <UpdateModal
      id={id}
      show={updateShow}
      onHide={() => setUpdateShow(false)}
      query={query}
      />
      <DeleteModal 
      id={id}
      show={smShow}
      onHide={() => setSmShow(false)}
      query={query}
      />
      </>
    );
  };
  export default CardDisplay;