import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const {user, isLoading, isError, message} = useSelector ((state)=> state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [mounted, setMounted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    user_id: "",
  });

  const { password } = formData;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);

    return () => clearTimeout(timer);
  }, []);

  // Password Strength
  const strength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];

  const strengthColor = [
    "",
    "bg-red-500",
    "bg-amber-400",
    "bg-yellow-300",
    "bg-emerald-400",
  ][strength];

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.75s ${delay}ms, transform 0.75s ${delay}ms`,
  });

  const set = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  
  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await dispatch(registerUser(formData));
   
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const FIELDS = [
    {
      key: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Full Name",
      icon: "👤",
    },
    {
      key: "user_id",
      label: "User ID",
      type: "text",
      placeholder: "User_04",
      icon: "@",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "User@gmail.com",
      icon: "✉",
    },
    {
      key: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Phone",
      icon: "☎",
    },
  ];

  
    useEffect(() => {
      if(user){
        navigate("/dashboard")
      }
      if(isError && message){
        toast.error(message)
      }
    }, [user,isError,message]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12 overflow-hidden mt-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .font-serif-disp {
          font-family: 'Instrument Serif', serif;
        }

        .font-dm {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 1s linear infinite;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #171717 inset !important;
          -webkit-text-fill-color: #f0ede8 !important;
        }
      `}</style>

      <div className="w-full max-w-md">
    
            {/* Header */}
            <div style={fade(80)} className="mb-10 text-center">
              <h1 className="font-serif-disp text-5xl text-[#f0ede8] mb-3">
                Create Account
              </h1>

              <p className="text-[#f0ede8]/40 text-sm font-dm">
                Start splitting bills smarter.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#111111] border border-white/[0.07] rounded-3xl p-8"
            >
              {/* Fields */}
              <div style={fade(160)} className="space-y-5">
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <label className="block text-[11px] uppercase tracking-[0.08em] text-[#f0ede8]/40 mb-2 font-dm">
                      {f.label}
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0ede8]/25 text-sm">
                        {f.icon}
                      </span>

                      <input
                        type={f.type}
                        value={formData[f.key]}
                        onChange={set(f.key)}
                        placeholder={f.placeholder}
                        className={`w-full bg-[#171717] border rounded-xl pl-10 pr-4 py-3.5 text-[#f0ede8] text-sm placeholder-[#f0ede8]/20 outline-none transition-all duration-200 font-dm
                        
                        ${
                          errors[f.key]
                            ? "border-red-500/60"
                            : "border-white/[0.07]"
                        }

                        focus:border-[#c9a96e]/50`}
                      />
                    </div>

                    {errors[f.key] && (
                      <p className="text-red-400 text-xs mt-2 font-dm">
                        {errors[f.key]}
                      </p>
                    )}
                  </div>
                ))}

                {/* Password */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-[#f0ede8]/40 mb-2 font-dm">
                    Password
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0ede8]/25 text-sm">
                      🔒
                    </span>

                    <input
                      type={showPass ? "text" : "password"}
                      value={formData.password}
                      onChange={set("password")}
                      placeholder="Min. 6 characters"
                      className={`w-full bg-[#171717] border rounded-xl pl-10 pr-12 py-3.5 text-[#f0ede8] text-sm placeholder-[#f0ede8]/20 outline-none transition-all duration-200 font-dm

                      ${
                        errors.password
                          ? "border-red-500/60"
                          : "border-white/[0.07]"
                      }

                      focus:border-[#c9a96e]/50`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f0ede8]/35"
                    >
                      {showPass ? "🙈" : "👁"}
                    </button>
                  </div>

                  {/* Strength */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4].map((s) => (
                          <div
                            key={s}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              strength >= s
                                ? strengthColor
                                : "bg-white/[0.08]"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-[#f0ede8]/40 font-dm">
                        {strengthLabel} password
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-red-400 text-xs mt-2 font-dm">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div style={fade(320)} className="mt-6 mb-7">
                <p className="text-[#f0ede8]/30 text-xs leading-[1.7] font-dm">
                  By creating an account you agree to our Terms & Privacy
                  Policy.
                </p>
              </div>

              {/* Submit */}
              <div style={fade(380)}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c9a96e] hover:bg-[#e8c990] disabled:opacity-60 text-[#0a0a0a] text-sm font-medium py-3.5 rounded-xl transition-all duration-200 font-dm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin-slow w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="rgba(0,0,0,0.25)"
                          strokeWidth="2.5"
                        />

                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="#0a0a0a"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      Creating account...
                    </>
                  ) : (
                    "Create Account →"
                  )}
                </button>
              </div>

              {/* Login */}
              <div className="mt-7 text-center">
                <p className="text-[#f0ede8]/35 text-sm font-dm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#c9a96e] hover:text-[#e8c990] transition-all"
                  >
                    Login account
                  </a>
                </p>
              </div>
            </form>
       
      
      </div>
    </div>
  );
};

export default RegisterPage;