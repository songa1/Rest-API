const successHandler = (res, status, message, data) => {
    res.status(status).json({
      success: true,
      status,
      message,
      data
    });
  };
 module.exports = successHandler;