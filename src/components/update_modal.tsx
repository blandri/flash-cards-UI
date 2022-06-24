import { gql, useMutation } from "@apollo/client";
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
        
    }
})

return  (
<Modal
{...props}
size="md"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
  <Modal.Title id="contained-modal-title-vcenter">
  Update Card
  </Modal.Title>
</Modal.Header>
<Modal.Body>
  <Stack gap={3}>
  <input onChange={e=>setTitle(e.target.value)} type="text"></input>
  <input onChange={e=>setDetails(e.target.value)} type="text"></input>
  </Stack>
</Modal.Body>
<Modal.Footer>
  <Button
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