/**
 * @returns Unenrolls from the Course
 *
 * @param {String} courseId Course to Unenroll from
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function postUnenrollCourse(
  courseId,
  username,
  userpassword
) {
  const res = await fetch("/api/course/unenroll", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      courseId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.unenroll) return res.unenroll;
      else throw new Error(res.error);
    });

  return res;
}
