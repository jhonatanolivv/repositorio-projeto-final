// * 'Are you sure' button

function checker () {
  let result = confirm('Are you sure?');
  if (result === false) {
    event.preventDefault();
  } 
};



