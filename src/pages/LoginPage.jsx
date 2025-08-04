import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,//name=email and value is input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // mockig  API call{will use api fr login}
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
      };
      
      dispatch(loginSuccess(userData));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('Login failed. Please try again.'));
    }
  };

  const handlegooglelogin = () => {
  window.location.href = "https://www.google.com";
};
const handlefacebooklogin=()=>{
   window.location.href = "https://www.facebook.com"
}
  return (
    <div className="min-h-screen bg-gray-50 flex items-center 
    justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <div>
          <h2 className="mt-6 text-center text-3xl 
          font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-blue-600 hover:text-blue-500" >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
    </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email" name="email" type="email"autoComplete="email" required
                className="appearance-none rounded-none relative block w-full 
                px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                rounded-t-md focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
          </div>
          <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password" name="password" type="password"
                 autoComplete="current-password" 
                //  if entered before suggest him
                required
                className="appearance-none rounded-none relative block w-full 
                px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                rounded-b-md focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
          </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 
                rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border 
              border-transparent text-sm font-medium rounded-md text-white bg-blue-600 
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Sign in')}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button" onClick={handlegooglelogin}
                className="w-full inline-flex justify-center py-2 px-4 border 
                border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium 
                text-gray-500 hover:bg-gray-50"
              >
                <span>Google</span>
              </button>
              <button
                type="button" onClick={handlefacebooklogin}
                className="w-full inline-flex justify-center py-2 px-4 border
                 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium 
                 text-gray-500 hover:bg-gray-50"
              >
                <span>Facebook</span>
</button>
</div>
</div>
  </form>
 </div>
 </div>
  );
};

export default LoginPage;
