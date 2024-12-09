/**
 * @returns Enroll List of Users enrolled in the Course
 *
 * @param {String} courseId Course to Check
 */
export default async function postEnrollListFromCourse(courseId) {
  const res = await fetch("/api/enrollList/fromCourse", {
    method: "POST",
    body: JSON.stringify({
      courseId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.userList) return res.userList;
      else throw new Error(res.error);
    });

  return res;
}
