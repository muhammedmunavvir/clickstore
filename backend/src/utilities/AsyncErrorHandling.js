export const trycatch = (controller) => async (req, res, next) => {
  
  try {
    await controller(req, res,next);
  } catch (error) {
    console.log("try catch error handleing",error)
    return next(error);
  }
};
   