import { validateRoute } from "../../lib/protect";

export default validateRoute((req, res, user) => {
  return res.json(user);
});
