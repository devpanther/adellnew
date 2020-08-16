const styles = theme => ({

  content: {
    height: 'calc(100vh - 100px)',
    padding: '70px 40px 105px 40px',
    overflow: 'auto',
    // marginLeft: '300px',
    boxSizing: 'border-box',
    // overflowY: 'scroll',
    overflowX: 'hidden',
    top: '50px',
    // width: '100%',
    // position: 'absolute'
  },

  

  userSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#707BC4',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  friendSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#707BC4',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  chatHeader: {
    width: 'calc(100% - 301px)',
    height: '50px',
    backgroundColor: '#344195',
    position: 'fixed',
    marginLeft: '301px',
    fontSize: '18px',
    textAlign: 'center',
    color: 'white',
    paddingTop: '10px',
    boxSizing: 'border-box'
  }

});

export default styles;