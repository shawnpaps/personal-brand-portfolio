import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    workType: "",
    workLink: "",
    notes: "",
    emailConsent: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.workType) newErrors.workType = "Please select a type of work";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          workType: "",
          workLink: "",
          notes: "",
          emailConsent: true
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-12",
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { delay: 0.2, type: "spring", stiffness: 200 },
              className: "w-20 h-20 bg-gradient-to-br from-warm-500 to-warm-600 rounded-full flex items-center justify-center mx-auto mb-6",
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-10 h-10 text-moody-900",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M5 13l4 4L19 7"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            motion.h3,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              className: "text-2xl font-heading font-bold text-warm-400 mb-4",
              children: "Message Sent!"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6 },
              className: "text-moody-400 mb-8",
              children: "Thank you for reaching out. I'll get back to you soon!"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.8 },
              onClick: () => setIsSubmitted(false),
              className: "px-6 py-3 bg-warm-500/10 border border-warm-500/30 text-warm-400 font-heading tracking-wider uppercase hover:bg-warm-500/20 transition-all duration-300 rounded-lg",
              children: "Send Another Message"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
      className: "max-w-2xl mx-auto mb-4",
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.1 },
            className: "relative group",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  value: formData.name,
                  onChange: handleChange,
                  placeholder: "Your Name",
                  className: `w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 ${errors.name ? "border-red-500/50" : "border-warm-500/20 group-hover:border-warm-400/40"}`
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: errors.name && /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "absolute -bottom-6 left-0 text-red-400 text-sm",
                  children: errors.name
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.2 },
            className: "relative group",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  placeholder: "Your Email",
                  className: `w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 ${errors.email ? "border-red-500/50" : "border-warm-500/20 group-hover:border-warm-400/40"}`
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: errors.email && /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "absolute -bottom-6 left-0 text-red-400 text-sm",
                  children: errors.email
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.3 },
            className: "relative group",
            children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  name: "workType",
                  value: formData.workType,
                  onChange: handleChange,
                  className: `w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 appearance-none cursor-pointer ${errors.workType ? "border-red-500/50" : "border-warm-500/20 group-hover:border-warm-400/40"}`,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", className: "bg-moody-800 text-moody-500", children: "Select Type of Work" }),
                    /* @__PURE__ */ jsx("option", { value: "photography", className: "bg-moody-800 text-moody-100", children: "Professional Photography" }),
                    /* @__PURE__ */ jsx("option", { value: "audio", className: "bg-moody-800 text-moody-100", children: "Music Production/Audio Engineering" }),
                    /* @__PURE__ */ jsx("option", { value: "other", className: "bg-moody-800 text-moody-100", children: "Other..." })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5 text-moody-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M19 9l-7 7-7-7"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsx(AnimatePresence, { children: errors.workType && /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "absolute -bottom-6 left-0 text-red-400 text-sm",
                  children: errors.workType
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.4 },
            className: "relative group",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "url",
                  name: "workLink",
                  value: formData.workLink,
                  onChange: handleChange,
                  placeholder: "Link to your existing work/music (optional)",
                  className: `w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 ${errors.workLink ? "border-red-500/50" : "border-warm-500/20 group-hover:border-warm-400/40"}`
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: errors.workLink && /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "absolute -bottom-6 left-0 text-red-400 text-sm",
                  children: errors.workLink
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.5 },
            className: "relative group",
            children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  name: "notes",
                  value: formData.notes,
                  onChange: handleChange,
                  placeholder: "Anything else you'd like me to know about your project...",
                  rows: 4,
                  className: `w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 resize-none ${errors.notes ? "border-red-500/50" : "border-warm-500/20 group-hover:border-warm-400/40"}`
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: errors.notes && /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "absolute -bottom-6 left-0 text-red-400 text-sm",
                  children: errors.notes
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.6 },
            className: "flex items-start space-x-3 group",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  name: "emailConsent",
                  checked: formData.emailConsent,
                  onChange: handleChange,
                  className: "mt-1 w-5 h-5 text-warm-500 bg-moody-800/50 border-2 border-warm-500/20 rounded focus:ring-warm-400 focus:ring-2 focus:ring-offset-0 focus:ring-offset-moody-900 transition-all duration-300 group-hover:border-warm-400/40"
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "text-sm text-moody-300 leading-relaxed", children: "I consent to receive email communications from Shawn Paps regarding my project and updates about your services." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            type: "submit",
            disabled: isSubmitting,
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.7 },
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            className: "w-full px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-moody-900 font-heading font-semibold tracking-wider uppercase hover:from-warm-400 hover:to-warm-500 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" }),
              /* @__PURE__ */ jsx("span", { className: "relative z-10 flex items-center justify-center", children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: { rotate: 360 },
                    transition: { duration: 1, repeat: Infinity, ease: "linear" },
                    className: "w-5 h-5 border-2 border-moody-900 border-t-transparent rounded-full mr-3"
                  }
                ),
                "Sending..."
              ] }) : "Send Message" })
            ]
          }
        )
      ] })
    }
  );
};

export { ContactForm as C };
