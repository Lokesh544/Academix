/**
 * @returns Finds and return a List of Courses
 *
 * @param {String} search Search Query
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getCourses(search) {
  const res = await fetch("/api/course/list", {
    method: "POST",
    body: JSON.stringify({
      search,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.courses) return res.courses;
      else throw Error(res.error);
    });

  return res;
}
