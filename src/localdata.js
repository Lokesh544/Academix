"use client";

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
   * Removes Username from Local Storage
   */
  removeUsername: () => {
    window.localStorage.removeItem(keywords.username);
  },

  /**
   * Removes User Password from Local Storage
   */
  removeUserpassword: () => {
    window.localStorage.removeItem(keywords.password);
  },

  /**
   * @returns Username from Local Storage
   */
  username: () => window.localStorage.getItem(keywords.username),

  /**
   * @returns User Password from Local Storage
   */
  password: () => window.localStorage.getItem(keywords.password),
};
