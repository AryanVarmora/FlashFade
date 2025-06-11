// import { useState } from "react";
// import { Brain, Eye, EyeOff, Zap } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     setIsLoading(true);
    
//     console.log("Logging in with:", { email, password });
    
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
//     maxWidth: '400px',
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

//   const headerStyle = {
//     textAlign: 'center',
//     marginBottom: '2rem'
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
//     gap: '1.25rem',
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
//     outline: 'none'
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

//   return (
//     <div style={containerStyle}>
//       {/* Background orbs */}
//       <div style={backgroundOrbStyle1}></div>
//       <div style={backgroundOrbStyle2}></div>

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
//             Remember actively, or watch knowledge fade away
//           </p>
//         </div>

//         {/* Form */}
//         <div style={formStyle}>
//           <div style={inputGroupStyle}>
//             <label htmlFor="email" style={labelStyle}>
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
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
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{...inputStyle, paddingRight: '3rem'}}
//                 placeholder="Enter your password"
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
//               <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
//                 <div style={{
//                   width: '1rem',
//                   height: '1rem',
//                   border: '2px solid white',
//                   borderTop: '2px solid transparent',
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite'
//                 }}></div>
//                 <span>Accessing Memory Vault...</span>
//               </div>
//             ) : (
//               "Enter Memory Vault"
//             )}
//           </button>
//         </div>

//         {/* Options */}
//         <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
//           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem'}}>
//             <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563'}}>
//               <input type="checkbox" />
//               <span>Remember me</span>
//             </label>
//             <a href="#" style={linkStyle}>
//               Forgot password?
//             </a>
//           </div>

//           <div style={{position: 'relative', textAlign: 'center'}}>
//             <div style={{
//               position: 'absolute',
//               top: '50%',
//               left: 0,
//               right: 0,
//               height: '1px',
//               background: '#d1d5db'
//             }}></div>
//             <span style={{
//               position: 'relative',
//               background: 'white',
//               padding: '0 0.5rem',
//               color: '#6b7280',
//               fontSize: '0.875rem'
//             }}>New to FlashFade?</span>
//           </div>

//           <div style={{textAlign: 'center'}}>
//             <a href="/register" style={{
//               ...linkStyle,
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '0.25rem',
//               fontWeight: '500'
//             }}>
//               <span>Create your memory vault</span>
//               <Brain className="w-4 h-4" style={{color: '#4f46e5'}} />
//             </a>
//           </div>
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
// }


// components/Login.jsx - Updated with Authentication
import { useState } from "react";
import { Brain, Eye, EyeOff, Zap } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate authentication (replace with real auth later)
    try {
      console.log("Logging in with:", { email, password });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login (replace with real validation)
      if (email && password) {
        const userData = {
          id: '1',
          email: email,
          username: email.split('@')[0],
          createdAt: new Date().toISOString()
        };
        
        login(userData);
        navigate('/dashboard');
      } else {
        setError("Please enter both email and password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
    maxWidth: '400px',
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

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
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
    gap: '1.25rem',
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
    outline: 'none'
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

  return (
    <div style={containerStyle}>
      {/* Background orbs */}
      <div style={backgroundOrbStyle1}></div>
      <div style={backgroundOrbStyle2}></div>

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
            Remember actively, or watch knowledge fade away
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
            <label htmlFor="email" style={labelStyle}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{...inputStyle, paddingRight: '3rem'}}
                placeholder="Enter your password"
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
                onClick={() => setShowPassword(!showPassword)}
                style={passwordToggleStyle}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
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
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Accessing Memory Vault...</span>
              </div>
            ) : (
              "Enter Memory Vault"
            )}
          </button>
        </div>

        {/* Options */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563'}}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" style={linkStyle}>
              Forgot password?
            </a>
          </div>

          <div style={{position: 'relative', textAlign: 'center'}}>
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
            }}>New to FlashFade?</span>
          </div>

          <div style={{textAlign: 'center'}}>
            <a href="/register" style={{
              ...linkStyle,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: '500'
            }}>
              <span>Create your memory vault</span>
              <Brain className="w-4 h-4" style={{color: '#4f46e5'}} />
            </a>
          </div>
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
}