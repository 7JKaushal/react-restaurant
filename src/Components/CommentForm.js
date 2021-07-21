/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (value) => value && value.length;
const maxLength = (length) => (value) => !value || value.length <= length;
const minLength = (length) => (value) => !value || value.length >= length;

class Comment extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div>
        <Button>
          <span className="fa fa-comment" onClick={this.toggleModal}>
            {" "}
            Add Comment
          </span>
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="author">Author Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  className="form-control"
                  name="author"
                  placeholder="Author Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "This is required felid.",
                    minLength: "Must be greater than or equal to 3 characters.",
                    maxLength: "Must be lesser than 15 characters",
                  }}
                />
              </Row>
              <br />
              <Row>
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <br />
              <Row>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  className="form-control"
                  rows="6"
                />
              </Row>
              <Row ClassName="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="success">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Comment;
