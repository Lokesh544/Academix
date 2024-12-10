/**
 * @returns Enroll List of Courses enrolled by User
 *
 * @param {String} userId User to Check
 * @param {String} search Search Query
 */
export default async function getEnrolledCoursesByUser(userId, search) {
  const res = await fetch("/api/enrollList/fromUser", {
    method: "POST",
    body: JSON.stringify({
      userId,
      search,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.courseList) return res.courseList;
      else throw new Error(res.error);
    });

  return res;
}
