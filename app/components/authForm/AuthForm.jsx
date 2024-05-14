import PropTypes from "prop-types";
import "./authform.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signupSchema, signinSchema } from "../schemas/index";
import { login, signup } from "../../features/auth/authThunks";
import { useEffect, useState } from "react";
import DemoUsers from "../DemoUsers/DemoUsers"
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthForm = ({
  title = "",
  buttonText = "",
  message = "",
  inputFields = [],
  welcomeMsg = "",
  welcomeDetail = "",
  formType,
  showCheckbox = false,
  user_type = "",
}) => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue, handleBlur } = useFormik({
    initialValues: {
      ...inputFields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {}),
      user_type: user_type,
    },
    validationSchema: formType === "signin" ? signinSchema : signupSchema,
    onSubmit: (values, action) => {
      if (formType === "signin") {
        dispatch(login(values));
      } else if (formType === "signup") {
        dispatch(signup(values));
      }
      action.resetForm();
    },
  });

  useEffect(() => {
    isLogin && router.push('/projects');
  }, [isLogin, router]);

  return (
    <div className="main">
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h2>{title}</h2>
            {title === "Hello!" && (
              <p className="signin-desc">Sign in to your account</p>
            )}
          </div>
          <form className="auth-form" method="post" onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <div key={field.name} className="input-with-icon">
                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                />
                <i className={field.iconClass} />
                {errors[field.name] && touched[field.name] ? (
                  <p className="validation-error">{errors[field.name]}</p>
                ) : null}
              </div>
            ))}
            {showCheckbox && (
              <div className="checkbox-container">
                <label htmlFor="qa" className="terms-conditions-label">
                  <input
                    type="checkbox"
                    name="user_type"
                    checked={values.user_type === "qa"}
                    onChange={() =>
                      setFieldValue(
                        "user_type",
                        values.user_type === "qa" ? "developer" : "qa"
                      )
                    }
                  />
                  <p className="term">QA?</p>
                </label>
              </div>
            )}
            <div className="signin-button-container">
              <input type="submit" value={buttonText} />
            </div>
          </form>
          {formType === "signin" && (
            <>
            <p onClick={() => setIsOpen(true)} className="text-blue-500">Demo Users</p>
            <Link href={"/signup"} className="auth-message">
              {message}
            </Link>
            </>
          )}
          {formType === "signup" && (
            <Link href={"/login"} className="auth-message">
              {message}
            </Link>
          )}
        </div>
        <div className="welcomeback-section">
          <h3>{welcomeMsg}</h3>
          <p>{welcomeDetail}</p>
        </div>
      </div>
      <DemoUsers isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string,
  formType: PropTypes.string,
  buttonText: PropTypes.string,
  message: PropTypes.string,
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      placeholder: PropTypes.string,
      iconClass: PropTypes.string,
    })
  ),
  showCheckbox: PropTypes.bool,
  welcomeMsg: PropTypes.string,
  welcomeDetail: PropTypes.string,
  user_type: PropTypes.string,
};

export default AuthForm;
