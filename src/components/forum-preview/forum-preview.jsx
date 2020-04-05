import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  selectTopicComments,
  selectTopicViews,
} from '../../redux/forum/forum.selector';
import renderHTML from 'react-render-html';
import userIco from '../../assets/userIco.svg';
import comment from '../../assets/comment.svg';
import view from '../../assets/view.svg';
import './forum-preview.scss';
class ForumPreview extends React.Component {
  state = {
    setComment: {},
    views: {},
  };
  handleRouting = () => {
    this.props.history.push(
      `forum/${this.props.topicData.title.split(' ').join('-').toLowerCase()}`
    );
  };
  componentDidMount() {
    this.props.topicComments
      .filter(
        (item, index) => item.id === this.props.topicData.title.toLowerCase()
      )
      .map((comm) => this.setState({ setComment: comm }));
    this.props.topicViews
      .filter(
        (item, index) => item.id === this.props.topicData.title.toLowerCase()
      )
      .map((view) => this.setState({ views: view }));
  }
  render() {
    const { title, body, user, posted_at } = this.props.topicData;
    const { displayName, photoURL } = user;
    return (
      <div className="forum-preview">
        <h3 className="title">{title}</h3>
        <div className="writer">
          <img
            className="user-icon"
            src={photoURL ? photoURL : userIco}
            alt="user"
          />
          <div className="name-time">
            <h5>{displayName}</h5>
            <span>
              {new Date(posted_at).toString().split(' ').slice(0, 5).join(' ')}
            </span>
          </div>
        </div>
        <p className="content">
          {renderHTML(body).props
            ? renderHTML(body)
                .props.children[0].split(' ')
                .slice(0, 30)
                .join(' ')
            : renderHTML(body)[0]
                .props.children[0].split(' ')
                .slice(0, 30)
                .join(' ')}{' '}
          <span className="read-more" onClick={this.handleRouting}>
            read more
          </span>
        </p>
        <div className="forum-preview-footer">
          <span className="forum-preview-footer-comment">
            <img src={comment} alt="Comment Icon" />
            {this.state.setComment.comments
              ? this.state.setComment.comments.comments.length
              : 0}{' '}
            Comments
          </span>
          <span className="forum-preview-footer-view">
            <img src={view} alt="Comment Icon" />
            {this.state.views.view
              ? this.state.views.view.views.length
              : 0}{' '}
            Views
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  topicComments: selectTopicComments,
  topicViews: selectTopicViews,
});

export default withRouter(connect(mapStateToProps)(ForumPreview));