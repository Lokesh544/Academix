/**
 * @returns Creates a post request to create a Course
 *
 * @param {{username: String, userpassword: String, courseId: String, name?: String, imageUrl?: String, about?: String, description?: String, price?: String, expectedTime?: String, data?: String}} props
 *
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 * @param {String} courseId Course Id
 * @param {String} name Course Name
 * @param {String} imageUrl Course Profile Image
 * @param {String} about A Smaller Description
 * @param {String} description
 * @param {String} price
 * @param {String} expectedTime
 * @param {String} data Course Content
 */
export default async function postUpdateCourse({
  username,
  userpassword,
  courseId,
  name,
  imageUrl,
  about,
  description,
  price,
  expectedTime,
  data,
}) {
  const res = await fetch("/api/course/update", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      username,
      userpassword,
      courseId,
      name,
      imageUrl,
      about,
      description,
      price,
      expectedTime,
      data,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) return res.success;
      else throw new Error(res.error);
    });

  return res;
}
