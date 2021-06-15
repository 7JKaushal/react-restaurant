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

const RenderComments = ({ comments }) => {
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
    </div>
  );
};

const DishDetail = ({ dish, comments }) => {
  if (dish === null) {
    return <div></div>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            <RenderDish dish={dish} />
          </div>
          <div className="col-12 col-md-5 mt-1">
            <RenderComments comments={comments} />
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;
