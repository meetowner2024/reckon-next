import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
const iconMap = { User, Phone, Mail, MessageSquare };
const DynamicContactForm = () => {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successTimer, setSuccessTimer] = useState(5);
  useEffect(() => {
    fetch("/api/users/contactus/form-config")
      .then((res) => res.json())
      .then((data) => {
        setFormConfig(data);
        const initialData = {};
        data.formFields.forEach((f) => (initialData[f.id] = ""));
        setFormData(initialData);
      })
      .catch(console.error);
  }, []);
  if (!formConfig) return <p>Loading...</p>;

  const handleChange = (e, field) => {
    const { name, value } = e.target;
    let val = value;
    if (field.transform === "numeric")
      val = value.replace(/\D/g, "").slice(0, field.maxLength || 10);
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validateField = (field, value) => {
    for (const v of field.validations || []) {
      switch (v.type) {
        case "required":
          if (!value.trim()) return v.message;
          break;
        case "minLength":
          if (value.length < v.value) return v.message;
          break;
        case "exactLength":
          if (value.length !== v.value) return v.message;
          break;
        case "pattern":
          if (!new RegExp(v.value).test(value)) return v.message;
          break;
        case "custom":
          if (!eval(`let ${field.id} = "${value}"; ${v.validator}`))
            return v.message;
          break;
      }
    }
    return "";
  };
  const validateForm = () => {
    const newErrors = {};
    formConfig.formFields.forEach((f) => {
      const err = validateField(f, formData[f.id]);
      if (err) newErrors[f.id] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/users/contactus/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitSuccess(true);
      setSuccessTimer(formConfig.formSettings?.successTimer || 5);
      setFormData(
        Object.fromEntries(formConfig.formFields.map((f) => [f.id, ""]))
      );
    } catch (err) {
      setErrors({ submit: "Failed to send. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field, index) => {
    const Icon = iconMap[field.icon] || null;
    const getHeightStyle = () => {
      if (field.type === "textarea" && field.resize) {
        return {
          minHeight: `${Math.max(
            120,
            formData[field.id].split("\n").length * 24 + 40
          )}px`,
          maxHeight: "200px",
        };
      }
      return {};
    };
    const getMobileInputClass = () => {
      if (field.id === "mobile") {
        if (errors[field.id]) return "ring-red-500 border-red-500";
        if (formData[field.id].length === field.maxLength)
          return "ring-green-500 border-green-500";
      }
      return "";
    };
    const inputClass = `w-full h-12 px-4 bg-white rounded-xl border-2 border-gray-200/60 hover:border-gray-300/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm font-medium text-black placeholder-gray-400 autofill:bg-white ${
      errors[field.id] ? "border-red-500 ring-red-500/10" : ""
    } ${getMobileInputClass()}`;
    return (
      <motion.div
        key={field.id || index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
        className="space-y-2"
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {Icon && <Icon className="w-4 h-4 text-blue-600" />}
          {field.label} {field.required && "*"}
        </label>
        {field.type === "textarea" ? (
          <textarea
            name={field.id}
            value={formData[field.id]}
            onChange={(e) => handleChange(e, field)}
            className={`w-full px-4 pt-4 pb-3 bg-white rounded-xl border-2 border-gray-200/60 hover:border-gray-300/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm font-medium text-black placeholder-gray-400 autofill:bg-white resize-none ${
              errors[field.id] ? "border-red-500 ring-red-500/10" : ""
            }`}
            style={getHeightStyle()}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete}
            maxLength={field.maxLength}
          />
        ) : (
          <input
            type={field.type}
            name={field.id}
            value={formData[field.id]}
            onChange={(e) => handleChange(e, field)}
            maxLength={field.maxLength}
            className={inputClass}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete}
          />
        )}
        {field.id === "mobile" &&
          formData[field.id].length === field.maxLength &&
          !errors[field.id] && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-xs text-green-600 pl-1"
            >
              <CheckCircle className="w-3 h-3" />
              Valid number ✓
            </motion.p>
          )}
        {errors[field.id] && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-600 pl-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors[field.id]}
          </motion.p>
        )}
      </motion.div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/10 py-8 sm:py-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/10 to-green-600/10 rounded-full border border-blue-200/50 mb-4 backdrop-blur-sm"
          >
            <Send className="w-5 h-5 text-blue-600 mr-2" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Let's Connect
            </h1>
          </motion.div>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Share your thoughts. We respond in{" "}
            <span className="font-semibold text-blue-600">24h</span>
          </p>
        </motion.div>
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-4 backdrop-blur-sm shadow-lg mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-10 h-10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-green-800 text-sm">
                      Message Sent!
                    </h3>
                    <p className="text-green-700 text-xs">
                      {formConfig.formSettings.successMessage}
                    </p>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-1 text-xs text-green-600 bg-green-100/50 rounded-full px-2 py-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Clock className="w-3 h-3" />
                  <span>{successTimer}</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formConfig.formFields.map((f, idx) => renderField(f, idx))}
          {errors.submit && <p className="text-red-600">{errors.submit}</p>}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`group relative w-full h-12 rounded-xl font-semibold text-black text-sm overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 px-4 ${
              isSubmitting || Object.keys(errors).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f0f9ff] text-[#0e55a1] hover:shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            <span className="flex items-center justify-center gap-2 flex-shrink-0">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-4 w-4 border-b-2 border-white rounded-full"
                  />
                  <span>{formConfig.formSettings.submittingText}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <span>{formConfig?.formSettings?.submitButtonText}</span>
                </>
              )}
            </span>
          </motion.button>
        </form>
      </div>
    </div>
  );
};
export default DynamicContactForm;
