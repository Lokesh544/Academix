/**
 * @returns List of Courses Created by User
 *
 * @param {String} userId User to Check
 * @param {String} search Search Query
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getCoursesByUser(
  userId,
  username,
  userpassword,
  search
) {
  const res = await fetch("/api/course/byUser", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      userId,
      search,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.courses) return res.courses;
      else throw new Error(res.error);
    });

  return res;
}
