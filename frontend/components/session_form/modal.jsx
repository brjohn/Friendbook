import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SignupFormContainer from './signup_form_container';
import UpdateProfileFormContainer from '../profile/update_profile_form_container';
import PostFormContainer from '../posts/post_form_container';
import ProfilePostFormContainer from '../posts/profile_post_form_container';

function Modal({ modal, closeModal }) {
    if (!modal){
        return null;
    }
    let component;
    switch (modal) {
        case 'signup':
            component = <SignupFormContainer />;
            break;
        case 'editprofile':
            component = <UpdateProfileFormContainer/>;
            break;
        case 'createpost':
            component = <PostFormContainer/>;
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    // debugger
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);