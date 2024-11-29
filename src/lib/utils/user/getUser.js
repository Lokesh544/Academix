/**
 * @returns Return the User
 *
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getUser(username, userpassword) {
  const res = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.user) return res.user;
      else throw Error(res.error);
    });

  return res;
}
