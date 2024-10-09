const keywords = {
  username: "username",
  password: "userpassword",
};

export const localdata = {
  /**
   *
   * @param {String} username
   * Updates username in Local Storage
   */
  setUsername: (username) => {
    window.localStorage.setItem(keywords.username, username);
  },

  /**
   *
   * @param {String} password
   * Updates user password in Local Storage
   */
  setUserpassword: (password) => {
    window.localStorage.setItem(keywords.password, password);
  },

  /**
   * @returns Username from Local Storage
   */
  username: window.localStorage.getItem(keywords.username),

  /**
   * @returns Password from Local Storage
   */
  password: window.localStorage.getItem(keywords.password),
};
