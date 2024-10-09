// [ ] Check
/**
 * @returns Finds and return the User from the userId
 *
 * @param {String} userId User to Return
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getUser(username, userpassword, userId) {
  const res = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      userId,
    }),
  });

  return res;
}
