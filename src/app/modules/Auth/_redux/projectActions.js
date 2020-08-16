
export const createProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection(`chat/users/${authorId}`)
      .add({
        ...project
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }
  };
