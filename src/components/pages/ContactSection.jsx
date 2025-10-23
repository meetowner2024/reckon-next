import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
const formConfig = {
  formFields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      icon: "User",
      validations: [
        { type: "required", message: "Name is required" },
        { type: "minLength", value: 2, message: "At least 2 characters" },
        {
          type: "pattern",
          value: "^[a-zA-Z\\s]+$",
          message: "Only letters and spaces allowed",
        },
      ],
      autoComplete: "name",
    },
    {
      id: "mobile",
      type: "tel",
      label: "Mobile Number",
      placeholder: "10-digit mobile number",
      required: true,
      icon: "Phone",
      maxLength: 10,
      validations: [
        { type: "required", message: "Mobile number is required" },
        { type: "exactLength", value: 10, message: "Exactly 10 digits" },
        {
          type: "pattern",
          value: "^[6-9][0-9]{9}$",
          message: "Must start with 6-9",
        },
      ],
      autoComplete: "tel",
      transform: "numeric",
    },
    {
      id: "email",
      type: "email",
      label: "Gmail Address",
      placeholder: "yourname@gmail.com",
      required: true,
      icon: "Mail",
      validations: [
        { type: "required", message: "Email is required" },
        {
          type: "pattern",
          value: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Valid email needed",
        },
        {
          type: "custom",
          validator:
            "email.includes('gmail.com') || email.includes('googlemail.com')",
          message: "Use Gmail only",
        },
      ],
      autoComplete: "email",
    },
    {
      id: "message",
      type: "textarea",
      label: "Your Message",
      placeholder: "Tell us about your requirements...",
      required: true,
      icon: "MessageSquare",
      maxLength: 1000,
      validations: [
        { type: "required", message: "Message is required" },
        { type: "minLength", value: 10, message: "At least 10 characters" },
      ],
      autoComplete: "off",
      resize: true,
    },
  ],
  formSettings: {
    submitButtonText: "Send Message",
    submittingText: "Sending...",
    successMessage: "Message Sent! We'll reply within 24 hours",
    successTimer: 5,
    submitDelay: 2000,
  },
};
const iconMap = {
  User: User,
  Phone: Phone,
  Mail: Mail,
  MessageSquare: MessageSquare,
};
const ContactSection = () => {
  const [formData, setFormData] = useState(
    formConfig.formFields.reduce(
      (acc, field) => ({ ...acc, [field.id]: "" }),
      {}
    )
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successTimer, setSuccessTimer] = useState(
    formConfig.formSettings.successTimer
  );
  const handleChange = (e, field) => {
    const { name, value } = e.target;
    let transformedValue = value;
    if (field.transform === "numeric") {
      transformedValue = value
        .replace(/\D/g, "")
        .slice(0, field.maxLength || 10);
    }
    setFormData((prev) => ({ ...prev, [name]: transformedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validateField = (field, value) => {
    for (const validation of field.validations) {
      switch (validation.type) {
        case "required":
          if (!value.trim()) return validation.message;
          break;
        case "minLength":
          if (value.trim().length < validation.value) return validation.message;
          break;
        case "exactLength":
          if (value.length !== validation.value) return validation.message;
          break;
        case "pattern":
          if (!new RegExp(validation.value).test(value))
            return validation.message;
          break;
        case "custom":
          if (!eval(`let ${field.id} = "${value}"; ${validation.validator}`))
            return validation.message;
          break;
        default:
          break;
      }
    }
    return "";
  };
  const validateForm = () => {
    const newErrors = {};
    formConfig.formFields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, formConfig.formSettings.submitDelay)
      );
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setSuccessTimer(formConfig.formSettings.successTimer);
      setFormData(
        formConfig.formFields.reduce(
          (acc, field) => ({ ...acc, [field.id]: "" }),
          {}
        )
      );
    } catch (error) {
      setErrors({ submit: "Failed to send. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (submitSuccess) {
      const timer = setInterval(
        () => setSuccessTimer((prev) => prev - 1),
        1000
      );
      setTimeout(() => {
        clearInterval(timer);
        setSubmitSuccess(false);
        setSuccessTimer(formConfig.formSettings.successTimer);
      }, formConfig.formSettings.successTimer * 1000);
      return () => clearInterval(timer);
    }
  }, [submitSuccess]);
  const getMobileInputClass = (field) => {
    if (field.id === "mobile") {
      if (errors[field.id]) return "ring-red-500 border-red-500";
      if (formData[field.id].length === field.maxLength)
        return "ring-green-500 border-green-500";
    }
    return "";
  };
  const getHeightStyle = (field) => {
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
  const renderField = (field, index) => {
    const Icon = iconMap[field.icon] || null;
    const isValid = formData[field.id].length > 0 && !errors[field.id];
    const inputClass = `w-full h-12 px-4 bg-white rounded-xl border-2 border-gray-200/60 hover:border-gray-300/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm font-medium text-black placeholder-gray-400 autofill:bg-white ${
      errors[field.id] ? "border-red-500 ring-red-500/10" : ""
    } ${getMobileInputClass(field)}`;
    return (
      <motion.div
        key={field.id}
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
            style={getHeightStyle(field)}
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
        {field.type === "textarea" && (
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>
              {formData[field.id].length}/{field.maxLength || 1000}
            </span>
            {field.resize && <span className="text-gray-400">Auto-resize</span>}
          </div>
        )}
      </motion.div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/10 py-8 sm:py-12 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
      </motion.div>
      <div className="max-w-md sm:max-w-2xl lg:max-w-7xl mx-auto px-4 relative z-10">
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
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 lg:pl-20 lg:pr-20"
          >
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-4 backdrop-blur-sm shadow-lg"
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
              {formConfig.formFields.map((field, index) =>
                renderField(field, index)
              )}
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
                      <span>{formConfig.formSettings.submitButtonText}</span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  {errors.submit}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: black !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        input[type="tel"]::-webkit-outer-spin-button,
        input[type="tel"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="tel"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};
export default ContactSection;
