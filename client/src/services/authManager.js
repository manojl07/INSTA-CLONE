let logoutHandler = null;
let isLoggingOut = false;

export const registerLogoutHandler = (handler) => {
  logoutHandler = handler;

  return () => {
    logoutHandler = null;
  };
};

export const triggerLogout = async () => {
  if (isLoggingOut) return;

  isLoggingOut = true;

  try {
    await logoutHandler?.();
  } finally {
    isLoggingOut = false;
  }
};