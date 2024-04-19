export const noAuth = (req, res, next) => {
  if (req.cookies['coderCookieToken']) {
    res.redirect('/');
  } else {
    next();
  }
};
