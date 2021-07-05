import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Comment from "./CommentForm";
import { Loading } from "./LoadingComponent";

const RenderDish = ({ dish }) => {
  return (
    <div>
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

const RenderComments = ({ comments, addComment, dishId }) => {
  let list;
  if (comments != null) {
    list = comments.map((comment) => {
      return (
        <li key={comment.id} className="list-unstyled">
          <br />
          {comment.comment} <br />
          -- {comment.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}
        </li>
      );
    });
  } else {
    list = <div></div>;
  }

  return (
    <div>
      <h4>Comments</h4>
      {list}
      <br />
      <Comment dishId={dishId} addComment={addComment} />
    </div>
  );
};

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMsg) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMsg}</h4>
        </div>
      </div>
    );
  } else if (props.dish !== null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 mt-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    <div></div>;
  }
};

export default DishDetail;

// ! If error occurs, change the code on line 75(approx) like this:
/*
if (props.dish === null) {
    return <div></div>;
  } else {
    return (
      ...
*/
