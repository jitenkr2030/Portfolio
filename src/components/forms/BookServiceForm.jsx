import React, { useState } from "react";

const services = [
  { value: "web-dev", label: "Web Development" },
  { value: "ai", label: "AI Integration" },
  { value: "wp-plugin", label: "WordPress Plugin" },
  { value: "hosting", label: "Hosting Setup" },
];

export default function BookServiceForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: "",
    date: "",
    description: "",
    file: null,
    login: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, files, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  }

  function next() { setStep((s) => s + 1); }
  function prev() { setStep((s) => s - 1); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData();
    data.append('service', form.service);
    data.append('date', form.date);
    data.append('description', form.description);
    data.append('login', form.login);
    if (form.file) {
      data.append('file', form.file);
    }
    const res = await fetch('/api/book-service', {
      method: 'POST',
      body: data,
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = `/payment?service=${form.service}`;
    } else {
      setError('There was an error submitting your booking. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-600 font-medium">{error}</div>}
      {step === 1 && (
        <div>
          <label className="block mb-2 font-medium">Select Service</label>
          <select name="service" value={form.service} onChange={handleChange} required className="input">
            <option value="">Choose...</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button type="button" onClick={next} className="btn btn-primary mt-4" disabled={!form.service}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label className="block mb-2 font-medium">Pick Date/Time (optional)</label>
          <input type="datetime-local" name="date" value={form.date} onChange={handleChange} className="input" />
          <button type="button" onClick={prev} className="btn btn-secondary mr-2">Back</button>
          <button type="button" onClick={next} className="btn btn-primary">Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <label className="block mb-2 font-medium">Describe Your Project</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="input" />
          <button type="button" onClick={prev} className="btn btn-secondary mr-2">Back</button>
          <button type="button" onClick={next} className="btn btn-primary">Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <label className="block mb-2 font-medium">Upload Reference File (optional)</label>
          <input type="file" name="file" onChange={handleChange} className="input" />
          <label className="block mt-4">
            <input type="checkbox" name="login" checked={form.login} onChange={handleChange} />
            <span className="ml-2">Login for faster checkout</span>
          </label>
          <button type="button" onClick={prev} className="btn btn-secondary mr-2">Back</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Continue to Payment'}</button>
        </div>
      )}
    </form>
  );
}
