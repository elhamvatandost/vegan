import { router } from "../../main";

export const errorHandler = function(err) {
  if (err.status === 401) {
    router.push({ name: "err401" });
  } else {
    router.push({ name: "err404" });
  }
};
