import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish = (dish) => {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  };

  renderComments = (comments) => {
    let list;
    if (comments != null) {
      list = comments.map((comment) => {
        return (
          <li key={comment.id} className="list-unstyled">
            {comment.comment} <br />
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
            <br /> <br />
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
  render() {
    if (this.props.dish === null) {
      return <div></div>;
    } else {
      return (
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            {this.renderDish(this.props.dish)}
          </div>

          <div className="col-12 col-md-5 mt-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    }
  }
}

export default DishDetail;
