
"use client";

import React from "react";

export const useAuth = () => {
  return { user: null };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
