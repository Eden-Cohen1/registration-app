import { create, test, enforce, only, warn, skipWhen } from "vest";

// Define a validation suite for form fields
const suite = create((data = {}, currentField) => {
  // Validate only the current field being changed
  only(currentField);

  // Email validation rules
  test("email", "Email is required", () => {
    enforce(data.email).isNotEmpty();
  });

  test("email", "Not an email", () => {
    // Skip this validation if the email field is empty
    skipWhen(!data.email, () => {});
    enforce(data.email.trim()).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  // Password validation rules
  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty();
  });

  test("password", "Password is too short", () => {
    enforce(data.password).longerThan(6);
  });

  test("password", "Password is weak. Maybe add a number", () => {
    warn(); // Mark as a warning instead of an error
    enforce(data.password).matches(/[0-9]/);
  });
});

export default suite;
