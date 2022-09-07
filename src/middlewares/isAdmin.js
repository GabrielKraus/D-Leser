const IS_ADMIN = true;

const isAdmin = (req, res, next) => {
  if (!IS_ADMIN) res.send({ error: "Usuario no autorizado" });

  next();
};

export { isAdmin };
