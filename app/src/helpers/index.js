export const messageFromMe = messageOwner => (
  // eslint-disable-next-line no-undef
  !!localStorage.getItem('username') &&
  !!messageOwner &&
  // eslint-disable-next-line no-undef
  localStorage.getItem('username') === messageOwner
)
