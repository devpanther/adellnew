const styles = theme => ({

  sendBtn: {
    color: 'blue',
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },

  // chatTextBoxContainer: {
  //   position: 'absolute',
  //   bottom: '15px',
  //   left: '315px',
  //   boxSizing: 'border-box',
  //   overflow: 'auto',
  //   width: '80%'
  // },

  chatTextBoxContainer: {
    bottom: '15px',
    position: 'absolute',
    width: '80%'
  },

  chatTextBox: {
    width: 'calc(100% - 25px)'
  }

});

export default styles;