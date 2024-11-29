/**
 * @returns Finds and return the User from the userId
 *
 * @param {String} userId User to Return
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getUserFromId(username, userpassword, userId) {
  const res = await fetch("/api/user/getById", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      userId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.user) return res.user;
      else throw Error(res.error);
    });

  return res;
}
