// import { useState } from "react";
// import { Brain, Eye, EyeOff, Zap, User } from "lucide-react";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     setIsLoading(true);

//     // Basic password confirmation check
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       setIsLoading(false);
//       return;
//     }

//     console.log("Registering user:", formData);

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   };

//   const containerStyle = {
//     minHeight: '100vh',
//     width: '100vw',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e293b 100%)',
//     position: 'relative',
//     overflow: 'hidden',
//     fontFamily: 'system-ui, -apple-system, sans-serif'
//   };

//   const cardStyle = {
//     width: '100%',
//     maxWidth: '420px',
//     padding: '2rem',
//     margin: '1rem',
//     background: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: '1rem',
//     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//     border: '1px solid rgba(255, 255, 255, 0.2)',
//     position: 'relative',
//     zIndex: 10
//   };

//   const backgroundOrbStyle1 = {
//     position: 'absolute',
//     top: '-10rem',
//     right: '-10rem',
//     width: '20rem',
//     height: '20rem',
//     borderRadius: '50%',
//     background: '#a855f7',
//     filter: 'blur(60px)',
//     opacity: 0.3,
//     animation: 'pulse 4s ease-in-out infinite'
//   };

//   const backgroundOrbStyle2 = {
//     position: 'absolute',
//     bottom: '-10rem',
//     left: '-10rem',
//     width: '20rem',
//     height: '20rem',
//     borderRadius: '50%',
//     background: '#4f46e5',
//     filter: 'blur(60px)',
//     opacity: 0.3,
//     animation: 'pulse 4s ease-in-out infinite',
//     animationDelay: '2s'
//   };

//   const backgroundOrbStyle3 = {
//     position: 'absolute',
//     top: '20%',
//     left: '80%',
//     width: '15rem',
//     height: '15rem',
//     borderRadius: '50%',
//     background: '#10b981',
//     filter: 'blur(50px)',
//     opacity: 0.2,
//     animation: 'pulse 6s ease-in-out infinite',
//     animationDelay: '1s'
//   };

//   const headerStyle = {
//     textAlign: 'center',
//     marginBottom: '1.5rem'
//   };

//   const iconContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: '1rem',
//     position: 'relative'
//   };

//   const titleStyle = {
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     margin: '0.5rem 0',
//     background: 'linear-gradient(to right, #4f46e5, #9333ea)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text'
//   };

//   const subtitleStyle = {
//     color: '#6b7280',
//     fontSize: '0.875rem',
//     margin: 0
//   };

//   const formStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//     marginBottom: '1.5rem'
//   };

//   const inputGroupStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.25rem'
//   };

//   const labelStyle = {
//     fontSize: '0.875rem',
//     fontWeight: '500',
//     color: '#374151',
//     marginBottom: '0.25rem'
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '0.75rem 1rem',
//     border: '1px solid #d1d5db',
//     borderRadius: '0.5rem',
//     fontSize: '1rem',
//     background: 'rgba(255, 255, 255, 0.8)',
//     transition: 'all 0.2s',
//     outline: 'none',
//     boxSizing: 'border-box'
//   };

//   const passwordContainerStyle = {
//     position: 'relative'
//   };

//   const passwordToggleStyle = {
//     position: 'absolute',
//     right: '0.75rem',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     background: 'none',
//     border: 'none',
//     color: '#9ca3af',
//     cursor: 'pointer',
//     padding: '0.25rem'
//   };

//   const buttonStyle = {
//     width: '100%',
//     padding: '0.75rem 1rem',
//     background: isLoading 
//       ? 'linear-gradient(to right, #6366f1, #a855f7)' 
//       : 'linear-gradient(to right, #4f46e5, #9333ea)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '0.5rem',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: isLoading ? 'not-allowed' : 'pointer',
//     transition: 'all 0.2s',
//     opacity: isLoading ? 0.7 : 1,
//     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//     outline: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '0.5rem'
//   };

//   const linkStyle = {
//     color: '#4f46e5',
//     textDecoration: 'none'
//   };

//   const footerStyle = {
//     textAlign: 'center',
//     fontSize: '0.75rem',
//     color: '#9ca3af',
//     marginTop: '1.5rem'
//   };

//   const hintStyle = {
//     fontSize: '0.75rem',
//     color: '#6b7280',
//     marginTop: '0.25rem'
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Background orbs */}
//       <div style={backgroundOrbStyle1}></div>
//       <div style={backgroundOrbStyle2}></div>
//       <div style={backgroundOrbStyle3}></div>

//       <div style={cardStyle}>
//         {/* Header */}
//         <div style={headerStyle}>
//           <div style={iconContainerStyle}>
//             <Brain className="w-8 h-8 text-indigo-600" style={{color: '#4f46e5'}} />
//             <Zap className="w-4 h-4 text-yellow-500" style={{
//               color: '#eab308',
//               position: 'absolute',
//               top: '-0.25rem',
//               right: '45%'
//             }} />
//           </div>
//           <h2 style={titleStyle}>FlashFade</h2>
//           <p style={subtitleStyle}>
//             Create your memory vault and start learning
//           </p>
//         </div>

//         {/* Form */}
//         <div style={formStyle}>
//           <div style={inputGroupStyle}>
//             <label htmlFor="username" style={labelStyle}>
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               name="username"
//               required
//               value={formData.username}
//               onChange={handleChange}
//               style={inputStyle}
//               placeholder="Choose a username"
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#4f46e5';
//                 e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = '#d1d5db';
//                 e.target.style.boxShadow = 'none';
//               }}
//             />
//           </div>

//           <div style={inputGroupStyle}>
//             <label htmlFor="email" style={labelStyle}>
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               style={inputStyle}
//               placeholder="your@email.com"
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#4f46e5';
//                 e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = '#d1d5db';
//                 e.target.style.boxShadow = 'none';
//               }}
//             />
//           </div>

//           <div style={inputGroupStyle}>
//             <label htmlFor="password" style={labelStyle}>
//               Password
//             </label>
//             <div style={passwordContainerStyle}>
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 style={{...inputStyle, paddingRight: '3rem'}}
//                 placeholder="Create a strong password"
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#4f46e5';
//                   e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#d1d5db';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={passwordToggleStyle}
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           <div style={inputGroupStyle}>
//             <label htmlFor="confirmPassword" style={labelStyle}>
//               Confirm Password
//             </label>
//             <div style={passwordContainerStyle}>
//               <input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 style={{...inputStyle, paddingRight: '3rem'}}
//                 placeholder="Confirm your password"
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#4f46e5';
//                   e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#d1d5db';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={passwordToggleStyle}
//               >
//                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           <div style={hintStyle}>
//             Password should be at least 8 characters long and include numbers and symbols
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={isLoading}
//             style={buttonStyle}
//             onMouseEnter={(e) => {
//               if (!isLoading) {
//                 e.target.style.background = 'linear-gradient(to right, #4338ca, #7c3aed)';
//                 e.target.style.transform = 'scale(1.02)';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!isLoading) {
//                 e.target.style.background = 'linear-gradient(to right, #4f46e5, #9333ea)';
//                 e.target.style.transform = 'scale(1)';
//               }
//             }}
//           >
//             {isLoading ? (
//               <>
//                 <div style={{
//                   width: '1rem',
//                   height: '1rem',
//                   border: '2px solid white',
//                   borderTop: '2px solid transparent',
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite'
//                 }}></div>
//                 <span>Creating Memory Vault...</span>
//               </>
//             ) : (
//               <>
//                 <Zap className="w-4 h-4" style={{color: 'white'}} />
//                 <span>Create Memory Vault</span>
//               </>
//             )}
//           </button>
//         </div>

//         {/* Terms */}
//         <div style={{textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem'}}>
//           By creating an account, you agree to our{" "}
//           <a href="#" style={linkStyle}>Terms of Service</a>{" "}
//           and{" "}
//           <a href="#" style={linkStyle}>Privacy Policy</a>
//         </div>

//         {/* Login Link */}
//         <div style={{position: 'relative', textAlign: 'center', marginBottom: '1rem'}}>
//           <div style={{
//             position: 'absolute',
//             top: '50%',
//             left: 0,
//             right: 0,
//             height: '1px',
//             background: '#d1d5db'
//           }}></div>
//           <span style={{
//             position: 'relative',
//             background: 'white',
//             padding: '0 0.5rem',
//             color: '#6b7280',
//             fontSize: '0.875rem'
//           }}>Already have an account?</span>
//         </div>

//         <div style={{textAlign: 'center'}}>
//           <a href="/" style={{
//             ...linkStyle,
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '0.25rem',
//             fontWeight: '500'
//           }}>
//             <span>Login Here</span>
//             <User className="w-4 h-4" style={{color: '#4f46e5'}} />
//           </a>
//         </div>

//         {/* Footer */}
//         <div style={footerStyle}>
//           <p style={{margin: '0.25rem 0'}}>Secure • Private • Effective</p>
//           <p style={{margin: '0.25rem 0'}}>© 2025 FlashFade - Make every memory count</p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.5; }
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;


// components/Register.jsx - Updated with Authentication
import { useState } from "react";
import { Brain, Eye, EyeOff, Zap, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Registering user:", formData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful registration (replace with real API call)
      const userData = {
        id: Date.now().toString(),
        email: formData.email,
        username: formData.username,
        createdAt: new Date().toISOString()
      };

      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reusing the same styles from Login for consistency
  const containerStyle = {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e293b 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '420px',
    padding: '2rem',
    margin: '1rem',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '1rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 10
  };

  const backgroundOrbStyle1 = {
    position: 'absolute',
    top: '-10rem',
    right: '-10rem',
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    background: '#a855f7',
    filter: 'blur(60px)',
    opacity: 0.3,
    animation: 'pulse 4s ease-in-out infinite'
  };

  const backgroundOrbStyle2 = {
    position: 'absolute',
    bottom: '-10rem',
    left: '-10rem',
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    background: '#4f46e5',
    filter: 'blur(60px)',
    opacity: 0.3,
    animation: 'pulse 4s ease-in-out infinite',
    animationDelay: '2s'
  };

  const backgroundOrbStyle3 = {
    position: 'absolute',
    top: '20%',
    left: '80%',
    width: '15rem',
    height: '15rem',
    borderRadius: '50%',
    background: '#10b981',
    filter: 'blur(50px)',
    opacity: 0.2,
    animation: 'pulse 6s ease-in-out infinite',
    animationDelay: '1s'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem'
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    background: 'linear-gradient(to right, #4f46e5, #9333ea)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    margin: 0
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const passwordContainerStyle = {
    position: 'relative'
  };

  const passwordToggleStyle = {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '0.25rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: isLoading 
      ? 'linear-gradient(to right, #6366f1, #a855f7)' 
      : 'linear-gradient(to right, #4f46e5, #9333ea)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    opacity: isLoading ? 0.7 : 1,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '0.875rem',
    textAlign: 'center',
    margin: '0.5rem 0',
    padding: '0.5rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.375rem'
  };

  const linkStyle = {
    color: '#4f46e5',
    textDecoration: 'none'
  };

  const footerStyle = {
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginTop: '1.5rem'
  };

  const hintStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem'
  };

  return (
    <div style={containerStyle}>
      {/* Background orbs */}
      <div style={backgroundOrbStyle1}></div>
      <div style={backgroundOrbStyle2}></div>
      <div style={backgroundOrbStyle3}></div>

      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <Brain className="w-8 h-8 text-indigo-600" style={{color: '#4f46e5'}} />
            <Zap className="w-4 h-4 text-yellow-500" style={{
              color: '#eab308',
              position: 'absolute',
              top: '-0.25rem',
              right: '45%'
            }} />
          </div>
          <h2 style={titleStyle}>FlashFade</h2>
          <p style={subtitleStyle}>
            Create your memory vault and start learning
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        {/* Form */}
        <div style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Choose a username"
              onFocus={(e) => {
                e.target.style.borderColor = '#4f46e5';
                e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="your@email.com"
              onFocus={(e) => {
                e.target.style.borderColor = '#4f46e5';
                e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <div style={passwordContainerStyle}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{...inputStyle, paddingRight: '3rem'}}
                placeholder="Create a strong password"
                onFocus={(e) => {
                  e.target.style.borderColor = '#4f46e5';
                  e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={passwordToggleStyle}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password
            </label>
            <div style={passwordContainerStyle}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{...inputStyle, paddingRight: '3rem'}}
                placeholder="Confirm your password"
                onFocus={(e) => {
                  e.target.style.borderColor = '#4f46e5';
                  e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={passwordToggleStyle}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div style={hintStyle}>
            Password should be at least 6 characters long
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(to right, #4338ca, #7c3aed)';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(to right, #4f46e5, #9333ea)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Creating Memory Vault...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" style={{color: 'white'}} />
                <span>Create Memory Vault</span>
              </>
            )}
          </button>
        </div>

        {/* Terms */}
        <div style={{textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem'}}>
          By creating an account, you agree to our{" "}
          <a href="#" style={linkStyle}>Terms of Service</a>{" "}
          and{" "}
          <a href="#" style={linkStyle}>Privacy Policy</a>
        </div>

        {/* Login Link */}
        <div style={{position: 'relative', textAlign: 'center', marginBottom: '1rem'}}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: '#d1d5db'
          }}></div>
          <span style={{
            position: 'relative',
            background: 'white',
            padding: '0 0.5rem',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>Already have an account?</span>
        </div>

        <div style={{textAlign: 'center'}}>
          <a href="/login" style={{
            ...linkStyle,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontWeight: '500'
          }}>
            <span>Sign in to your vault</span>
            <User className="w-4 h-4" style={{color: '#4f46e5'}} />
          </a>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <p style={{margin: '0.25rem 0'}}>Secure • Private • Effective</p>
          <p style={{margin: '0.25rem 0'}}>© 2025 FlashFade - Make every memory count</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Register;