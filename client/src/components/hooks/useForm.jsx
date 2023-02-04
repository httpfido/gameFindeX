import { useState } from "react";

export const useForm = (initialForm, validationForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    // setError(validate({ ...form, [property]: value }));
  };
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationForm(form))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationForm(form))

    if(!Object.keys(errors).length) setLoading(true)
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
