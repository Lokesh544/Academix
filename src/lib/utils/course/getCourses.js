// [ ] Check
/**
 * @returns Finds and return a List of Courses
 *
 * @param {String} search Search Query
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 */
export default async function getCourses(username, userpassword, search) {
  const res = await fetch("/api/course/list", {
    method: "POST",
    body: JSON.stringify({
      username,
      userpassword,
      search,
    }),
  });

  return res;
}
