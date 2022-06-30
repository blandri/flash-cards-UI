import React, { useEffect,  useState } from "react"
import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { gql, useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { getCards } from "../redux/actions/cards.action"
import { MyVerticallyCenteredModal } from "./create_modal"
import "../css/home.css"
import { getCategories } from "../redux/actions/category.action"
import CardDisplay from "./card"

interface homeProps{}

export const HomePage: React.FunctionComponent<homeProps>=():any=>{
  const [modalShow, setModalShow] = useState(false);
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const cards= useSelector((state:any)=> state.allCardsReducer)
  const [width,setWidth]= useState(3)
  const categories= useSelector((state:any)=> state.allCategoriesReducer.categories)
  const [filter,setFilter]= useState<any>()

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
  const FILTER_CARDS=gql`
  query AllCards($filter: String) {
    allCards(filter: $filter) {
      title
      details
      done
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

  const {data}= useQuery(GET_ALL_CARDS)
  const filtered= useQuery(FILTER_CARDS,{
    variables:{
       filter
    }
  })
  const cate= useQuery(GET_CATEGORY,{
    variables:{}
  })
  
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
            <div style={{
               
               background:"#39373d",
               borderRadius:"20px",
               paddingLeft:"15px",
               paddingTop:"4px",
              minHeight:"40px",
               width:"80%"
            }}>
              <p>Categories</p>
              {categories?.length>0&&categories?.map(
              (cat:any)=>(
                cat.cards?.length>0?(<p>{cat.name}</p>):null
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
        <Col style={{ paddingTop:"40px",fontFamily: 'Ubuntu'}}>
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
            <input onChange={e=>setFilter(e.target.value)} type="text" name="search" placeholder="search" style={{
            border:"solid #3E3D42",
            width:"200px",
            borderRadius:"20px",
            paddingLeft:"15px"
          }}/>
          <button onClick={()=>{
           dispatch(getCards(filtered?.data?.allCards)as any)
          console.log(filtered.data)
        }
        } style={{marginLeft:"10px",
          borderRadius:"20px",background:"rgb(43, 104, 234)",
          border:"solid rgb(43, 104, 234)",
          color:"white",
          cursor:"pointer"
          }}>GO</button>
            </div>
          
          
          </Row>
          <Row style={{
            display:"flex",
            flexDirection:"column",
            marginLeft:"23px"
          }}>
          {cards.cards?.length > 0 &&
                cards.cards.map((card:any) => (
                  <CardDisplay
                  title={card.title}
                  done={card.done}
                  details={card.details}
                  id={card.id}
                  categoryName={card.categoryName}
                  query={GET_ALL_CARDS}
           />
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
        query={GET_ALL_CARDS}
        catg={GET_CATEGORY}
      />
      </Row>
    </Container>
   )
}