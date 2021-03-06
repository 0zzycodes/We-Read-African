import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectAllForumTopics } from '../../redux/forum/forum.selector';
import CustomButton from '../custom-button/custom-button';
import UserPreview from '../user-preview/user-preview';
import ForumPreview from '../forum-preview/forum-preview';
import ForumEditor from '../forum-editor/forum-editor';
import './latest-topics.scss';

const LatestTopics = ({ currentUser, forumTopics }) => {
  const [isShow, setisShow] = useState(false);
  const handleToggleEditore = () => {
    setisShow(!isShow);
    !isShow
      ? (document.documentElement.style.overflowY = 'hidden')
      : (document.documentElement.style.overflowY = 'scroll');
  };
  const compare = (a, b) => {
    if (a.posted_at < b.posted_at) return 1;
    // if (a.view.views.length < b.view.views.length) return -1;
    return 0;
  };
  return (
    <div className="latest-topics">
      <div className="post-topic">
        {currentUser ? <UserPreview currentUser={currentUser} welcome /> : null}
        {currentUser ? (
          <span className="post-topic-btn" onClick={handleToggleEditore}>
            New Post
          </span>
        ) : (
          <Link to="/signin">
            <CustomButton acen>Log In / Register</CustomButton>
          </Link>
        )}
      </div>
      <br />
      <br />
      {isShow ? (
        <ForumEditor handleToggleEditore={handleToggleEditore} />
      ) : null}
      {forumTopics
        ? forumTopics.sort(compare).map((topic) => {
            const modifiedTopic = {
              tag: 'latest',
              ...topic,
            };
            return <ForumPreview key={topic.id} topicData={modifiedTopic} />;
          })
        : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  forumTopics: selectAllForumTopics,
});

export default connect(mapStateToProps)(LatestTopics);
