import PropTypes from 'prop-types'
import React from "react"
import * as Utils from '../Utils'
import { Col, Modal, ModalBody, Row } from "reactstrap"

const ConfirmModal = ({ show, onConfirm, onCloseClick, data }) => {
  return (
    <Modal isOpen={show} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              {/* {actionType=='Status' ? 
              <img src={require("../../assets/images/stats.png")} style={{width:200, height:'auto'}} />
            : */}
              <i
                className="ri-alert-fill"
                style={{ fontSize: "9em", color: Utils.themeColor }}
              />
              {/* } */}
              <h2>Are you sure?</h2>
              {data?.actionType == 'Status' ?
                <h4>You want to change the status to {data?.isActive ? 'Inactive' : 'Active'}!</h4>
                :
                <h4>{"You won't be able to revert this!"}</h4>
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="text-center mt-5 w-100">
              <button
                type="button"
                className="btn btn-success btn-lg me-2 w-100"
                onClick={onConfirm}
              >
                {data?.actionType == 'Status' ? data?.isActive ? 'Inactive it!' : 'Active it!' : 'Yes, delete it!'}
              </button>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center mt-5 w-100">
              <button
                type="button"
                className="btn btn-danger btn-lg me-2 w-100"
                onClick={onCloseClick}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default ConfirmModal
