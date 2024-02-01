import { Component } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'

class CommentArea extends Component {
  state = {
    comments: [],
  }
  //

  retrieveComments = () => {
    fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiYTRhNjViMjYxNTAwMTk4YTY5NjMiLCJpYXQiOjE3MDY3OTYxOTgsImV4cCI6MTcwODAwNTc5OH0.VvfMkGOKa1Yw3SYEiZxS2vqKXuAeQyFtD_xjuVOAJsE',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // la chiamata ha funzionato!
          return response.json()
        } else {
          throw new Error('Errore nel recupero dei commenti')
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments)
        this.setState({
          comments: arrayOfComments,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.retrieveComments()
  }

  render() {
    return (
      <div>
        <CommentsList commentsToShow={this.state.comments} />
        <AddComment asin={this.props.asin} />
      </div>
    )
  }
}

export default CommentArea
