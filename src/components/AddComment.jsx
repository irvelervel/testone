import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

class AddComment extends Component {
  state = {
    comment: {
      comment: '',
      rate: '1',
      elementId: this.props.asin,
    },
  }

  sendComment = () => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiYTRhNjViMjYxNTAwMTk4YTY5NjMiLCJpYXQiOjE3MDY3OTYxOTgsImV4cCI6MTcwODAwNTc5OH0.VvfMkGOKa1Yw3SYEiZxS2vqKXuAeQyFtD_xjuVOAJsE',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.comment),
    })
      .then((response) => {
        if (response.ok) {
          // commento salvato!
          alert('La recensione è stata salvata')
        } else {
          // problema
          alert('la recensione NON è stata salvata :(')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          console.log(this.state.comment)
          this.sendComment()
        }}
      >
        <Form.Control
          value={this.state.comment.comment}
          onChange={(e) => {
            this.setState({
              comment: {
                ...this.state.comment,
                comment: e.target.value,
              },
            })
          }}
        />
        <Form.Select
          value={this.state.comment.rate}
          onChange={(e) => {
            this.setState({
              comment: {
                ...this.state.comment,
                rate: e.target.value,
              },
            })
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
        <Button type="submit">INVIA</Button>
      </Form>
    )
  }
}

export default AddComment
