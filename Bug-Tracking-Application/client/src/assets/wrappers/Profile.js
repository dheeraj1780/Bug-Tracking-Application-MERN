import styled from "styled-components";

const Wrapper = styled.section`
  .profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7fc;
    padding: 2rem;
  }

  .profile-container {
    background-color: var(--primary-500);
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the contents */
    justify-content: center;
  }

  .profile-header {
    display: flex;
    flex-direction: column; /* Stack icon and name vertically */
    align-items: center; /* Center horizontally */
    margin-bottom: 1.5rem;
  }

  .profile-icon {
    margin-bottom: 15px; /* Space between icon and name */
  }

  .icon-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    text-align: center; /* Center the name */
  }

  .profile-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the profile details */
    justify-content: center;
  }

  .profile-info {
    display: flex;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    width: 100%;
    justify-content: space-between; /* Distribute label and value evenly */
    max-width: 600px;
  }

  .profile-label {
    font-weight: 500;
    color: #555;
    width: 150px;
  }

  .profile-value {
    color: #333;
  }

  .edit-profile-btn {
    background-color: var(--primary-700);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    margin-top: 2rem;
    transition: background-color 0.3s ease;
  }

  .edit-profile-btn:hover {
    background-color: var(--primary-900);
  }
`;

export default Wrapper;
