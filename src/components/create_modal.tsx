import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { createCard } from '../redux/actions/cards.action';

export function MyVerticallyCenteredModal(props:any) {
    // const [err,setErr]= useState<string>()
    const [title,setTitle]= useState<string>()
    const [details,setDetails]= useState<string>()
    const [category,setCategory]= useState<string>()
    const dispatch= useDispatch()

    const CREATE_CARD= gql`
  mutation CreateCard($title: String!, $details: String!, $category: String!) {
    createCard(title: $title, details: $details, category: $category) {
      id
      title
      details
      categoryId
    }
  }
  `

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
            onCompleted: ({ create }) => {
                console.log(create.data)
              dispatch(createCard(create.data) as any)
            }
          });
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Create Card
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3}>
        <input onChange={e=>setCategory(e.target.value)} type="text" placeholder="category"></input>
        <input onChange={e=>setTitle(e.target.value)} type="text" placeholder="title"></input>
        <input onChange={e=>setDetails(e.target.value)} type="text" placeholder="details"></input>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={e=>{
            create();
            props.onHide()
        }}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}