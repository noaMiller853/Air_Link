
exports.myFunction=()=> {
    return new Promise((resolve, reject) => {
      let isExpired = false;
  
      // Set a timeout of 1 minute
      setTimeout(() => {
        isExpired = true;
        resolve(isExpired);
      }, 60000);
  
      // Return false if called within 1 minute
      if (!isExpired) {
        resolve(isExpired);
      }
    });
  }