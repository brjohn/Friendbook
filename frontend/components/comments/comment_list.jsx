import React from 'react';
import { Link } from 'react-router-dom';
import SubcommentFormContainer from './subcomment_form_container';
import CommentListContainer from './comment_list_container';
import SubcommentListContainer from './subcomment_list_container';

class CommentList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            formclass: "hidden"
        }

        this.thumbnail = this.thumbnail.bind(this);
        this.displayCommentOptionsIcon = this.displayCommentOptionsIcon.bind(this);
        this.remove = this.remove.bind(this);
        this.displaySubformContainer = this.displaySubformContainer.bind(this);
    }
    
    
    thumbnail(poster){
        if (poster.profilePicUrl){
            return <img src={poster.profilePicUrl} className="thumbnail-comment"/>
        } else {
            return <i className="fas fa-user-circle"></i>
        }
    }

    remove(commentId){
        console.log(commentId)
        this.props.deleteComment(commentId).then(()=> {
            this.props.fetchPost(this.props.post.id)
        })
    }

    displayCommentOptionsIcon(comment){
        if (comment.commenter.id === this.props.currentUser ){
            return (
                <div className="edit-post-icon">
                    <i className="fas fa-ellipsis-h" ></i>
                    <ul className="post-options-dropdown">
                        <li onClick={() => this.remove(comment.id)}>
                            <i className="far fa-trash-alt"></i>
                            <p>Delete this comment</p>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return null;
        }        
    }
    displaySubformContainer(){
        this.setState({['formclass']: "subform-div"})
    }

    render(){
        // debugger
        if (this.props.post.comments){
            // console.log('comments')
        return (
        <ul className="post-comment-div">
            {Object.values(this.props.post.comments).map((comment, idx) => {
                return (
                    <li className="post-comment-li" key={idx}>
                        <Link to={`/users/${comment.commenter_id}`} className="poster-thumbnail">
                            {this.thumbnail(comment.commenter)}
                        </Link>
                        <div className="post-comment-column">
                            <div className="post-comment-row">
                                <div className="post-comment-gray">
                                    <p className="post-comment-name">{comment.commenter.first_name} {comment.commenter.last_name}</p>
                                    <p className="post-comment-body">{comment.body}</p>
                                </div>
                                {this.displayCommentOptionsIcon(comment)}
                            </div>
                            <div className="like-reply">
                                <p onClick={this.displaySubformContainer}>Reply</p>
                            </div>
                            <div className={this.state.formclass}>
                               <SubcommentFormContainer comment={comment}/> 
                            </div>
                            <SubcommentListContainer comment={comment}/>
                            
                        </div>
                    </li>
                )
            })}
            
        </ul>
        ) 
    } else {
        return null;
    }
    }
}



export default CommentList;