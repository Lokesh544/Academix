/**
 * @returns Finds and return the User from the userId
 *
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 * @param {String} name User Profile Name
 * @param {String} about User Profile About
 * @param {String} img User Profile Img
 */
export default async function postUpdateUser(
  username,
  userpassword,
  name,
  about,
  img
) {
  const res = await fetch("/api/user/update", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      name,
      about,
      img,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.user) return res.user;
      else throw Error(res.error);
    });

  return res;
}
