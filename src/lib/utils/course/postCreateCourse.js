/**
 * @returns Creates a post request to create a Course
 *
 * @param {{username: String, userpassword: String, name: String, imageUrl?: String, about?: String, description?: String, price?: String, expectedTime?: String}} props
 *
 * @param {String} username Logined Username
 * @param {String} userpassword Logined User Password
 * @param {String} name Course Name
 * @param {String} imageUrl Course Profile Image
 * @param {String} about A Smaller Description
 * @param {String} description
 * @param {String} price
 * @param {String} expectedTime
 */
export default async function postCreateCourse({
  username,
  userpassword,
  name,
  imageUrl,
  about,
  description,
  price,
  expectedTime,
}) {
  const res = await fetch("/api/course/create", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      username,
      userpassword,
      name,
      imageUrl,
      about,
      description,
      price,
      expectedTime,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.course) return res.course;
      else throw new Error(res.error);
    });

  return res;
}
