import React, { useEffect,  useState } from "react"
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSquarePlus, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation, useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { getCards } from "../redux/actions/cards.action"
import { MyVerticallyCenteredModal } from "./create_modal"
import "../css/home.css"
import { getCategories } from "../redux/actions/category.action"
import { DeleteModal } from "./delete_modal"
import doneIcon from "./doneIcon.svg"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import updateIcon from "./updateIcon.svg"
import { UpdateModal } from "./update_modal"
import { Collapse, ListItem } from '@mui/material';

interface homeProps{}

export const HomePage: React.FunctionComponent<homeProps>=():any=>{
  const [modalShow, setModalShow] = useState(false);
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const cards= useSelector((state:any)=> state.allCardsReducer)
  const [id,setId]= useState<Number>()
  const [width,setWidth]= useState(3)
  const categories= useSelector((state:any)=> state.allCategoriesReducer.categories)
  // const [render,setRender]= useState(false)
  const [smShow, setSmShow] = useState(false);
  const [updateShow,setUpdateShow]=useState(false);
  const [doneId,setDoneId] = useState<Number>()
  const [updateId,setUpdateId] = useState<Number>()
  const [t,setT]=useState<string>()
  const [d,setD]=useState<string>()
  const [c,setC]=useState<string>()
  const [op,setOp]=useState(false);

//   const forceUpdateReducer = (i:any) => i + 1

//  const useForceUpdate = () => {
//   const [, forceUpdate] = useReducer(forceUpdateReducer, 0)
//   return forceUpdate
// }
  
// const forceUpdate = useForceUpdate()


  useEffect(()=>{
     const token= localStorage.getItem("AUTH_TOKEN")
     if(!token) navigate("/")
  })

  const GET_ALL_CARDS= gql`
  query AllCards {
    allCards {
      id
      title
      details
      done
      categoryName
    }
  }
  `

  const GET_CATEGORY= gql`
  query AllCategories {
    allCategories {
      name
      id
      cards {
      title
      details
      done
    }
    }
  }
  `

  const MARK_DONE= gql`
  mutation MarkDone($markDoneId: Int!) {
    markDone(id: $markDoneId) {
      id
    }
  }
  `

  const [done]= useMutation(MARK_DONE,{
    variables:{
      markDoneId: doneId
    },
    onCompleted:(done)=>{
      console.log(done)
      dispatch(getCards(data?.allCards)as any)
    },
  })

  const {data}= useQuery(GET_ALL_CARDS)
  const cate= useQuery(GET_CATEGORY,{
    variables:{}
  })
  console.log(doneId)
  useEffect(()=>{
     dispatch(getCards(data?.allCards)as any)
     dispatch(getCategories(cate?.data?.allCategories) as any)
  },[dispatch,data?.allCards,cate?.data?.allCategories])

   return(
    <Container>
      <Row>
        <Col xs={width} style={{
          backgroundColor:"#3E3D42",
          marginLeft: width===1?-170:-60,
          minHeight: "100vh",
          color: "white",
          transition: "0.7s",
          paddingTop: "40px",
          fontFamily: 'Ubuntu'
        }}>
          <h2 style={{
            marginLeft:"10px"
          }}>Dashboard</h2>
          <Stack gap={2} style={{paddingTop:"10px",
          fontSize:"130%"
          }}>
            <div style={{
               display:"grid",
               gridTemplateColumns:"1fr 1fr",
               background:"#39373d",
               borderRadius:"20px",
               height:"40px",
               paddingLeft:"15px",
               paddingTop:"4px",
               width:"80%"
            }}>
              <p>Due today</p>
            </div>
            <div style={{
               display:"grid",
               gridTemplateColumns:"1fr 1fr",
               background:"#39373d",
               borderRadius:"20px",
               padding:"0px",
               paddingLeft:"15px",
               paddingTop:"4px",
               height:"40px",
               width:"80%"
            }}>
              <p>Cards</p>
            </div>
            <div onClick={e=>setOp(true)} style={{
               
               background:"#39373d",
               borderRadius:"20px",
               paddingLeft:"15px",
               paddingTop:"4px",
              minHeight:"40px",
               width:"80%",
               cursor:"pointer"
            }}>
              <p>Categories</p>
              {categories?.length>0&&categories?.map(
              (cat:any)=>(
                <p>{cat.name}</p>
              )
            )}
            </div>
            <div>
            <Button onClick={e=>{localStorage.removeItem("AUTH_TOKEN");navigate("/")}} variant="primary"
            style={{marginTop:"90px"}}
            >
           Log out
        </Button>
            </div>
          </Stack>
          
        </Col>
        <Col style={{ paddingTop:"40px"}}>
          <Row style={{
            display: "grid",
            flexDirection: "column",
            gridTemplateColumns: "auto auto",
            padding:0
          }}>
            <div style={{
              paddingLeft:"35px"
            }}>
            <FontAwesomeIcon onClick={e=>{
            width===1?setWidth(3):setWidth(1)
          }} icon={width===1?faBars:faXmark} color="#3E3D42" size={"2x"} style={{cursor:"pointer"}} />
            </div>
            <div>
            <input type="text" name="search" placeholder="search" style={{
            border:"solid #3E3D42",
            width:"200px",
            borderRadius:"20px",
            paddingLeft:"15px"
          }}/>
            </div>
          
          
          </Row>
          <Row style={{
            display:"flex",
            flexDirection:"column",
            marginLeft:"23px"
          }}>
          {cards.cards?.length > 0 &&
                cards.cards.map((card:any) => (
                  <Card
          style={{ width: '30rem', marginTop:"50px",padding:0
        }}
          className="mb-2"
          key={card.id}
          border={card.done?"success":"warning"}
        >
          <Card.Header style={{display:"flex",justifyContent:"space-between"}}>
           <p>{card.categoryName}</p> 
          <FontAwesomeIcon onClick={async(e)=>{
            setId(card.id);
            setSmShow(true)
          }} icon={faCircleXmark} color={card.done?"rgb(5, 153, 5)":"orange"} style={{ marginTop:"-3.5%", marginRight:"-5%", cursor:"pointer"}}/>
          </Card.Header>
          <Card.Body style={{
            height: "10%"
          }}>
            <Card.Title style={{
              fontWeight:"700"
            }}>{card.title}</Card.Title>
            <Card.Text>
              {card.details}
            </Card.Text>
            
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
             <div className="card-text" onClick={() => {
              setUpdateId(card.id)
              setT(card.title)
              setD(card.details)
              setC(card.categoryName)
              setUpdateShow(true)
             }
            } style={{
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
             <div onClick={async e=>{
              setDoneId(card.id)
              await done()
             }} className="card-text"  style={{
              display:"flex",
              cursor:"pointer"
             }}>
             <Card.Text className="card-text"  style={{marginBottom: "-2px",paddingRight:"10px"}}>Done</Card.Text>
            {card.done?(
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
         ))
        }
         <div style={{
          position:"absolute",
          left: "93%",
          bottom:"3%",
          width:"50px"
        }}>
        <FontAwesomeIcon color="#3E3D42" onClick={() => setModalShow(true)} icon={faSquarePlus} style={{
          cursor:"pointer"
          }} size={"3x"} />
        </div>
          </Row>
        </Col>
        
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <UpdateModal 
      title={t}
      details={d}
      category={c}
      id={updateId}
      show={updateShow}
      onHide={() => setUpdateShow(false)}
      />
      <DeleteModal 
      id={id}
      show={smShow}
      onHide={() => setSmShow(false)}
      />
      </Row>
    </Container>
   )
}