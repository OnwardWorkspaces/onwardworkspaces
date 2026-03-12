import PropTypes from 'prop-types'
import React from "react"
import * as Utils from "../../Utils";
import { Col, Modal, ModalBody, Row } from "reactstrap"

const DeleteModal = ({ show, onDeleteClick, onCloseClick, actionType, data }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              {/* {actionType=='Status' ? 
              <img src={require("../../assets/images/stats.png")} style={{width:200, height:'auto'}} />
            : */}
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: Utils.themeColor }}
              />
  {/* } */}
              <h2>Are you sure?</h2>
              {actionType == 'Status' ?
                <h4>You want to change the status to {data?.isActive ? 'Inactive' : 'Active'}!</h4>
                :
                <h4>{"You won't be able to revert this!"}</h4>
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg me-2"
                onClick={onDeleteClick}
              >
                {actionType=='Status' ? data?.isActive ? 'Inactive it!' : 'Active it!' :  'Yes, delete it!'}
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg me-2"
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

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default DeleteModal
