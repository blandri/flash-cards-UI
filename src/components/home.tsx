import React, { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripLines, faCircleXmark, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation, useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { getCards } from "../redux/actions/cards.action"
import { MyVerticallyCenteredModal } from "./create_modal"
import "../css/home.css"

interface homeProps{}

export const HomePage: React.FunctionComponent<homeProps>=():any=>{
  const [modalShow, setModalShow] = useState(false);
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const cards= useSelector((state:any)=> state.allCardsReducer)
  const [id,setId]= useState<Number>()
  const [width,setWidth]= useState(1)
  

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
    }
  }
  `
  const DELETE_CARD= gql`
  mutation DeleteCard($deleteCardId: Int!) {
    deleteCard(id: $deleteCardId) {
      title
    }
  }
  `

  const [del] = useMutation(DELETE_CARD, {
    variables: {
      deleteCardId:id,
      id
    },
    onError: ({graphQLErrors,networkError})=>{
        if (graphQLErrors)
graphQLErrors.forEach(({ message, locations, path }) =>
console.log(message)
);
if (networkError) console.log(`[Network error]: ${networkError}`);
    },
    onCompleted: ({ del }) => {
        console.log(del)
    }
  });

  let {data}= useQuery(GET_ALL_CARDS)
console.log(id)
  useEffect(()=>{
     dispatch(getCards(data?.allCards)as any)
  },[dispatch,data?.allCards])

   return(
    <Container>
      <Row>
        <Col xs={width} style={{
          backgroundColor:"#3E3D42",
          marginLeft: width===1?-170:-60,
          minHeight: "100vh",
          color: "white",
          // display: full===false?"none":"block",
          transition: "0.7s"
        }}>
          <h2>Categories</h2>
          <Stack gap={2}>
            <div>science</div>
            <div>workout</div>
            <div>
            <Button onClick={e=>{localStorage.removeItem("AUTH_TOKEN");navigate("/")}} variant="primary">
           Log out
        </Button>
            </div>
          </Stack>
          
        </Col>
        <Col style={{ paddingTop:"40px"}}>
          <FontAwesomeIcon onClick={e=>{
            width===1?setWidth(3):setWidth(1)
          }} icon={faGripLines} size={"2x"}/>
        {cards.cards?.length > 0 &&
                cards.cards.map((card:any) => (
                  <Card
          style={{ width: '50rem', marginTop:"30px" }}
          className="mb-2"
          key={card.id}
        >
          <Card.Header style={{display:"flex",justifyContent:"space-between"}}>
           <p>Category</p> 
          <FontAwesomeIcon onClick={e=>{
            setId(card.id);
            del()
          }} icon={faCircleXmark} style={{ marginTop:"-2%", marginRight:"-3%", cursor:"pointer"}}/>
          </Card.Header>
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>
              {card.details}
            </Card.Text>
          </Card.Body>
        </Card>

                ))
        }
        </Col>
        <FontAwesomeIcon onClick={() => setModalShow(true)} icon={faSquarePlus} style={{marginTop:"-5%",marginLeft:"48%"}} size={"3x"} />
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </Row>
    </Container>
   )
}