import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';

export function DetailInvoice(props) {
  const { show: basicModal, setShow: setBasicModal } = props;

  const toggleOpen = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Detail Invoice</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer className="py-5">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <MDBContainer>
                      <p className="my-5 text-center" style={{ fontSize: '30px' }}>
                        Thank for your purchase
                      </p>
                      <MDBRow>
                        <MDBTypography listUnStyled>
                          <li className="text-black">John Doe</li>
                          <li className="text-muted mt-1">
                            <span className="text-black">Invoice</span> #12345
                          </li>
                          <li className="text-black mt-1">April 17 2021</li>
                        </MDBTypography>
                        <hr />
                        <MDBCol xl="10">
                          <p>Pro Package</p>
                        </MDBCol>
                        <MDBCol xl="2">
                          <p className="float-end">$199.00</p>
                        </MDBCol>
                        <hr />
                      </MDBRow>
                      <MDBRow>
                        <MDBCol xl="10">
                          <p>Consulting</p>
                        </MDBCol>
                        <MDBCol xl="2">
                          <p className="float-end">$100.00</p>
                        </MDBCol>
                        <hr />
                      </MDBRow>
                      <MDBRow>
                        <MDBCol xl="10">
                          <p>Support</p>
                        </MDBCol>
                        <MDBCol xl="2">
                          <p className="float-end">$10.00</p>
                        </MDBCol>
                        <hr style={{ border: '2px solid black' }} />
                      </MDBRow>
                      <MDBRow className="text-black">
                        <MDBCol xl="12">
                          <p className="float-end fw-bold">Total: $10.00</p>
                        </MDBCol>
                        <hr style={{ border: '2px solid black' }} />
                      </MDBRow>
                      <div className="text-center" style={{ marginTop: '90px' }}>
                        <a>
                          <u className="text-info">View in browser</u>
                        </a>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                      </div>
                    </MDBContainer>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default DetailInvoice;
