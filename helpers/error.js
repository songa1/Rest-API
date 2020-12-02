
const errorRes = (res, status, message, error) => {
    res.status(status).json({
      success: false,
      message,
      error,
    });
  };
module.exports = errorRes;
  