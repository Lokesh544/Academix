/**
 * @returns List of Courses Created by User
 *
 * @param {String} userId User to Check
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getCoursesByUser(userId, username, userpassword) {
  const res = await fetch("/api/course/byUser", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      userId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.courses) return res.courses;
      else throw new Error(res.error);
    });

  return res;
}
