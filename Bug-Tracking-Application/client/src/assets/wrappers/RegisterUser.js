import styled from "styled-components";

const Wrapper = styled.section`
  .register-page {
    min-height: 100vh;
    padding: 3rem;
    background-color: var(--primary-700); /* Light/Dark Mode background */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .register-page h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }

  .register-form {
    width: 100%;
    max-width: 600px;
    background-color: var(--background-secondary-color);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid var(--grey-300);
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: var(--primary-500);
    outline: none;
  }

  .generate-btn {
    background-color: var(--primary-500);
    color: var(--white);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background-color 0.3s ease;
  }

  .generate-btn:hover {
    background-color: var(--primary-700);
  }

  .submit-btn {
    background-color: var(--primary-500);
    color: var(--white);
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: var(--primary-700);
  }
`;

export default Wrapper;
