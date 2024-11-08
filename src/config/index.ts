const Config = {
  NODE_ENV: import.meta.env.NODE_ENV ?? "development",
  SERVER_URL: import.meta.env.SERVER_URL ?? "http://localhost:8080/query",
  __DEV__: import.meta.env.NODE_ENV !== "production",
};

export default Config;
