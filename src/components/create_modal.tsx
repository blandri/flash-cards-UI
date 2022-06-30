import { gql, useMutation } from '@apollo/client';
import {  useState } from 'react';
import { Spinner, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { createCard } from '../redux/actions/cards.action';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css/create.css"

export function MyVerticallyCenteredModal(props:any) {
    // const [err,setErr]= useState<string>()
    const [title,setTitle]= useState<string>()
    const [details,setDetails]= useState<string>()
    const [category,setCategory]= useState<string>()
    const dispatch= useDispatch()
    const [loading,setLoading]= useState(false)

    const CREATE_CARD= gql`
  mutation CreateCard($title: String!, $details: String!, $category: String!) {
    createCard(title: $title, details: $details, category: $category) {
      id
      title
      details
      categoryName
    }
  }
  `

//   const forceUpdateReducer = (i:any) => i + 1

//  const useForceUpdate = () => {
//   const [, forceUpdate] = useReducer(forceUpdateReducer, 0)
//   return forceUpdate
// }
  
// const forceUpdate = useForceUpdate()

const [create] = useMutation(CREATE_CARD, {
            variables: {
              title,
              details,
              category
            },
            onError: ({graphQLErrors,networkError})=>{
                if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      // setErr(message)
      console.log(message)
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
            },
            onCompleted: async ({ create }) => {
                console.log(create.data)
              await dispatch(createCard(create.data) as any)
              
            },
            refetchQueries:[
              {
                query: props.query
              },
              {
                query: props.catg
              }
            ]
          });
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{
          display:"flex",
          justifyContent:"flex-start"
        }}>
        <input onChange={e=>setCategory(e.target.value)} type="text" placeholder="category"></input>
        
        </Modal.Title>
        <FontAwesomeIcon color='rgb(5, 153, 5)' onClick={e=>props.onHide()} icon={faCircleXmark} style={{
          marginTop:"-10%", 
          marginRight:"-3%",
          cursor:"pointer"
        }}/>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3}>
        <input onChange={e=>setTitle(e.target.value)} type="text" placeholder="title" style={{ fontWeight:"800"}}></input>
        <textarea name="body" id="det" cols={30} rows={4} onChange={e=>setDetails(e.target.value)} placeholder="details"></textarea>
        </Stack>
      </Modal.Body>
      <Modal.Footer    style={{
          border:"none",
          background: "linear-gradient(hsl(180, 5%, 100%),hsl(180, 5%, 80%))",
      }}>
        <Button
        style={{
          background:"rgb(5, 153, 5)",
          border:"rgb(5, 153, 5)"
        }}
        disabled={loading}
        onClick={async (e)=>{
            setLoading(true)
            await create();
            setLoading(false)
            props.onHide();
        }}>{loading?
          <Spinner animation="border" role="status" size='sm'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>:
          "SAVE"
        }</Button>
      </Modal.Footer>
    </Modal>
  );
}