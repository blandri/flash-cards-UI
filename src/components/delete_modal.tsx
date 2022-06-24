import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteModal=(props:any)=>{
    const [loading,setLoading]= useState(false)
    const id=props.id

    const DELETE_CARD= gql`
  mutation DeleteCard($deleteCardId: Int!) {
    deleteCard(id: $deleteCardId) {
      title
    }
  }
  `

  const [del] = useMutation(DELETE_CARD, {
    variables: {
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

  return (
    <>
      {/* <Button onClick={() => setSmShow(true)} className="me-2">
        Small modal
      </Button> */}
      <Modal
        {...props}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            This card is going to be deleted!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <Button 
        disabled={loading}
        onClick={async () => {
            setLoading(true)
            await del();
            setLoading(false)
            props.onHide()
        }} className="me-2"
        style={{
            backgroundColor:"#C92427",
            border:"none"
        }}
        >
            {
                loading?
                <Spinner animation="border" role="status" size='sm'>
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                :"Delete"
            }
      </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}