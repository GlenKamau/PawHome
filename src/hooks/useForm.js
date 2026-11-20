import { useCallback, useState } from "react";

export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }, []);

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (validate) {
        const validationErrors = validate(values) || {};
        if (validationErrors[name]) {
          setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
        }
      }
    },
    [validate, values]
  );

  const resetForm = useCallback(
    (nextValues = initialValues) => {
      setValues(nextValues);
      setErrors({});
      setTouched({});
    },
    [initialValues]
  );

  const handleSubmit = useCallback(
    (onSubmit) => async (event) => {
      event.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      if (validate) {
        const validationErrors = validate(values) || {};
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
          return;
        }
      }

      if (onSubmit) {
        await onSubmit(values, { resetForm, setErrors });
      }
    },
    [values, validate, resetForm]
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    handleSubmit,
  };
}