/**
 * @returns Finds and return the Course from the courseId
 *
 * @param {String} courseId Course to Return
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getCourse(courseId, username, userpassword) {
  const res = await fetch("/api/course", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      courseId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.course) return res.course;
      else throw Error(res.error);
    });

  return res;
}
