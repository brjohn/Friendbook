import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions/user_actions';
import Profile from './profile';
import { openModal } from '../../actions/modal_actions';
import {fetchPosts} from '../../actions/post_actions';

const mapStateToProps = ({ ui, session, entities: { users, posts } }, ownProps) => ({
    // posts
    // friends
    profileOwner: users[ownProps.match.params.userId],
    currentUser: session.currentUser,
    fullCurrentUser: users[session.currentUser],
    profileOwnerId: ownProps.match.params.userId,
    modal: ui.modal,
    posts: Object.values(posts) 


});

const mapDispatchToProps = dispatch => ({
    // edit profile
    // write a post
    // upload pics
    
    fetchUser: id => dispatch(fetchUser(id)),
    updateUser: user => dispatch(updateUser(user)),
    openModal: modal => dispatch(openModal(modal)),
    fetchPosts: (wallId) => dispatch(fetchPosts(wallId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);