/**
 * @returns Enroll List of Courses enrolled by User
 *
 * @param {String} userId User to Check
 */
export default async function postEnrollListFromUser(userId) {
  const res = await fetch("/api/enrollList/fromUser", {
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.courseList) return res.courseList;
      else throw new Error(res.error);
    });

  return res;
}
