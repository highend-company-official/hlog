const isProviderURL = (profileUrl: string) => {
  if (profileUrl.startsWith("https://")) {
    // Provider reserved profile image
    return true;
  }

  return false;
};

export default isProviderURL;
