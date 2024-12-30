import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--primary-700);

  .view-user-container {
    background-color: var(--background-secondary-color);
    padding: 2rem;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem; /* For consistent spacing */
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    background-color: var(--primary-200);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--text-secondary-color);
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .user-name {
    color: var(--text-primary-color);
    font-size: 1.5rem;
    font-weight: bold;
  }

  .user-details {
    background-color: var(--background-tertiary-color);
    color: var(--text-secondary-color);
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 8px;
    width: 100%;
    text-align: left;
    line-height: 1.6;
  }

  .details-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .details-label {
    font-weight: bold;
    color: var(--text-primary-color);
  }

  .details-value {
    color: var(--text-secondary-color);
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 1rem;
    width: 100%;
  }

  .back-button,
  .edit-button {
    background-color: var(--primary-500);
    color: var(--button-text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .delete-btn {
    background-color: #ff0000;
    color: var(--button-text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .back-button:hover,
  .edit-button:hover {
    background-color: var(--primary-700);
    color: white;
  }

  .delete-btn:hover {
    background-color: #8b0000;
    color: white;
  }
`;

export default Wrapper;
