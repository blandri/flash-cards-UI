import { gql, useMutation } from "@apollo/client";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal, Spinner, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { upCard } from "../redux/actions/cards.action";


export const UpdateModal=(props:any)=>{
    const [title,setTitle]= useState<any>(undefined)
    const [details,setDetails]= useState<any>(undefined)
    const dispatch= useDispatch()
    const [loading,setLoading]= useState(false)
    const id=props.id

const UPDATE_CARD=gql`
mutation UpdateCard($updateCardId: Int!, $title: String, $details: String) {
    updateCard(id: $updateCardId, title: $title, details: $details) {
      title
      details
      done
    }
  }
`


const [update]= useMutation(UPDATE_CARD,{
    variables:{
        updateCardId:id,
        title: title,
        details: details
    },
    onError:()=>{
        setLoading(false)
    },
    onCompleted:({update})=>{
        console.log(update)
        dispatch(upCard("success") as any)
        
    },
    refetchQueries:[
      {
        query: props.query
      }
    ]
})

return  (
<Modal
{...props}
size="md"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header>
  <Modal.Title id="contained-modal-title-vcenter">
  Update Card
  </Modal.Title>
  <FontAwesomeIcon color='rgb(5, 153, 5)' onClick={e=>props.onHide()} icon={faCircleXmark} style={{
          marginTop:"-14%",
          marginRight:"-5%", 
          cursor:"pointer"
        }}/>
</Modal.Header>
<Modal.Body>
  <Stack gap={3}>
  <input onChange={e=>setTitle(e.target.value)} type="text" placeholder="Title" style={{ fontWeight:"800"}}></input>
  <input onChange={e=>setDetails(e.target.value)} type="text" placeholder="Details"></input>
  </Stack>
</Modal.Body>
<Modal.Footer style={{
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
      await update();
      setLoading(false)
      props.onHide();
  }}>{loading?
    <Spinner animation="border" role="status" size='sm'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>:
    "Update"
  }</Button>
</Modal.Footer>
</Modal>
);

}