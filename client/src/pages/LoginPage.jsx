import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {

  const {user, isLoading, isError,isSuccess, message}=  useSelector ((state)=> state.auth)

  const [mounted, setMounted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if(user){
      navigate("/dashboard")
    }
    if(isError && message){
      toast.error(message)
    }
    setTimeout(() => setMounted(true), 60);
  }, [user,isError,message]);

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s ${delay}ms`,
  });

  const set = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form))

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1800);
  };



  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12 overflow-hidden mt-12">
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

      {/* Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div style={fade(0)} className="text-center mb-10">
          <h1 className="font-serif-disp text-5xl text-[#f0ede8] tracking-tight">
            Split
            <span className="text-[#c9a96e]">wise</span>
          </h1>

          <p className="text-[#f0ede8]/35 mt-3 text-sm font-dm">
            Welcome back. Continue splitting smarter.
          </p>
        </div>

        {/* Card */}
        <div
          style={fade(140)}
          className="bg-[#111111] border border-white/[0.07] rounded-3xl p-8 backdrop-blur-xl"
        >
          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-serif-disp text-4xl text-[#f0ede8] mb-2">
              Sign In
            </h2>

            <p className="text-[#f0ede8]/35 text-sm font-dm">
              Access your account securely.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-[#f0ede8]/40 mb-2 font-dm">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0ede8]/25">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="jatin@gmail.com"
                  value={form.email}
                  onChange={set("email")}
                  className={`w-full bg-[#171717] border rounded-xl pl-10 pr-4 py-3.5 text-[#f0ede8] text-sm placeholder-[#f0ede8]/20 outline-none transition-all duration-200 font-dm

                 

                  focus:border-[#c9a96e]/50`}
                />
              </div>

            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-[#f0ede8]/40 mb-2 font-dm">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0ede8]/25">
                  🔒
                </span>

                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={set("password")}
                  className={`w-full bg-[#171717] border rounded-xl pl-10 pr-12 py-3.5 text-[#f0ede8] text-sm placeholder-[#f0ede8]/20 outline-none transition-all duration-200 font-dm

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
            </div>

          

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a96e] hover:bg-[#e8c990] disabled:opacity-60 text-[#0a0a0a] text-sm font-medium py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 font-dm flex items-center justify-center gap-2"
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

                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-7 text-center">
            <p className="text-[#f0ede8]/35 text-sm font-dm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#c9a96e] hover:text-[#e8c990] transition-all"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;