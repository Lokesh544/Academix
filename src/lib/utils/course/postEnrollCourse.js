/**
 * @returns Enrolls in the Course
 *
 * @param {String} courseId Course to Enroll In
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function postEnrollCourse(
  courseId,
  username,
  userpassword
) {
  const res = await fetch("/api/course/enroll", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      courseId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.enroll) return res.enroll;
      else throw new Error(res.error);
    });

  return res;
}
