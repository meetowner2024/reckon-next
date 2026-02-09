import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const iconMap = { User, Phone, Mail, MessageSquare };

const DynamicContactForm = ({ formConfig }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [localConfig, setLocalConfig] = useState(null);

  // Auto-hide success message after 2.5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Initialize form
  useEffect(() => {
    if (!formConfig?.formFields) return;

    const fieldsWithId = formConfig.formFields.map((field) => {
      const baseId = field.label
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return {
        ...field,
        id: field.id
          ? `${field.id}-${uuidv4().slice(0, 8)}`
          : `${baseId}-${uuidv4().slice(0, 8)}`,
      };
    });

    setLocalConfig({ ...formConfig, formFields: fieldsWithId });
    const initialData = {};
    fieldsWithId.forEach((f) => (initialData[f.id] = ""));
    setFormData(initialData);
  }, [formConfig]);

  if (!localConfig) {
    return (
      <div className="py-16 text-center text-gray-500 text-lg">
        Loading contact form...
      </div>
    );
  }

  const handleChange = (e, field) => {
    let value = e.target.value;
    if (field.id.includes("mobile") || field.id.includes("phone")) {
      value = value.replace(/\D/g, "").slice(0, field.maxLength || 10);
    }
    setFormData((prev) => ({ ...prev, [field.id]: value }));
    if (errors[field.id]) {
      setErrors((prev) => {
        const { [field.id]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateField = (field, value) => {
    for (const rule of field.validations || []) {
      switch (rule.type) {
        case "required":
          if (!value.trim()) return rule.message;
          break;
        case "minLength":
          if (value.length < rule.value) return rule.message;
          break;
        case "exactLength":
          if (value.length !== rule.value) return rule.message;
          break;
        case "pattern":
          if (!new RegExp(rule.value).test(value)) return rule.message;
          break;
        case "custom":
          try {
            const fn = new Function("value", `return ${rule.validator}`);
            if (!fn(value)) return rule.message;
          } catch {
            return "Invalid validation";
          }
          break;
      }
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    localConfig.formFields.forEach((f) => {
      const err = validateField(f, formData[f.id] || "");
      if (err) newErrors[f.id] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const payload = { form_id: uuidv4(), ...formData };

      const res = await fetch("/api/users/contactus/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      // Success!
      setSubmitSuccess(true);
      setFormData(
        Object.fromEntries(localConfig.formFields.map((f) => [f.id, ""]))
      );
      setErrors({});
    } catch (err) {
      setErrors({ submit: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field, index) => {
    const Icon = iconMap[field.icon] || null;
    const isMobile = field.id.includes("mobile") || field.id.includes("phone");
    const isValidMobile = isMobile && formData[field.id]?.length === (field.maxLength || 10);

    const inputClass = `w-full h-12 px-4 bg-white rounded-xl border-2 border-gray-200/60 hover:border-gray-300/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm font-medium text-black placeholder-gray-400 autofill:bg-white ${
      errors[field.id]
        ? "border-red-500 ring-red-500/10"
        : isValidMobile
        ? "border-green-500 ring-green-500/10"
        : ""
    }`;

    const textareaStyle = field.type === "textarea" && field.resize
      ? {
          minHeight: `${Math.max(120, (formData[field.id]?.split("\n").length || 1) * 24 + 40)}px`,
          maxHeight: "200px",
        }
      : {};

    return (
      <motion.div
        key={field.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className="space-y-2"
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {Icon && <Icon className="w-4 h-4 text-blue-600" />}
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>

        {field.type === "textarea" ? (
          <textarea
            name={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(e, field)}
            className={`w-full px-4 pt-4 pb-3 bg-white rounded-xl border-2 border-gray-200/60 hover:border-gray-300/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium text-black placeholder-gray-400 resize-none ${
              errors[field.id] ? "border-red-500 ring-red-500/10" : ""
            }`}
            style={textareaStyle}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete}
            maxLength={field.maxLength}
          />
        ) : (
          <input
            type={field.type || "text"}
            name={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(e, field)}
            maxLength={field.maxLength}
            className={inputClass}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete}
          />
        )}

        {isValidMobile && !errors[field.id] && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-xs text-green-600 pl-1"
          >
            <CheckCircle className="w-3 h-3" />
            Valid number
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
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/10 py-8 sm:py-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
  
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/70 rounded-2xl p-5 shadow-lg backdrop-blur-sm text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-lg font-bold text-green-800">
                Your request has been submitted successfully! <br /> Our team will get back to you soon.
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

       
        <form onSubmit={handleSubmit} className="space-y-6">
          {localConfig.formFields.map(renderField)}

          {errors.submit && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center font-medium bg-red-50 py-2 px-4 rounded-lg"
            >
              {errors.submit}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`group relative w-full h-12 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f0f9ff] text-[#0e55a1] hover:shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-4 w-4 border-2 border-t-transparent border-white rounded-full"
                />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default DynamicContactForm;