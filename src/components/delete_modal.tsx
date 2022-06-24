import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteModal=()=>{
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      {/* <Button onClick={() => setSmShow(true)} className="me-2">
        Small modal
      </Button> */}
      <Modal
        
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            This card is going to be deleted!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <Button onClick={() => setSmShow(false)} className="me-2"
        style={{
            backgroundColor:"#C92427",
            border:"none"
        }}
        >
        Delete
      </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}