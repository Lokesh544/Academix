/**
 * @returns Finds and return the UserId from the User
 *
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getUserId(username, userpassword) {
  const res = await fetch("/api/user/id", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.userId) return res.userId;
      else throw Error(res.error);
    });

  return res;
}
