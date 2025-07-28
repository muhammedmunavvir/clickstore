
export const CustomErrorhandler = (message, statusCode = 400) => {
  return {
    message, 
    statusCode,
    stack: new Error().stack, 
  };
}; 


  