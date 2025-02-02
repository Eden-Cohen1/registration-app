import { create, test, enforce, only, warn, skipWhen } from "vest";

const suite = create((data = {}, currentField) => {
  only(currentField);

  test("email", "Email is required", () => {
    enforce(data.email).isNotEmpty();
  });

  test("email", "Not an email", () => {
    skipWhen(!data.email, () => {});
    enforce(data.email.trim()).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty();
  });

  test("password", "Password is too short", () => {
    enforce(data.password).longerThan(6);
  });

  test("password", "Password is weak. maybe add a number", () => {
    warn();
    enforce(data.password).matches(/[0-9]/);
  });
});

export default suite;
