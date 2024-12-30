import styled from "styled-components";

const Wrapper = styled.section`
  .users-page {
    min-height: 100vh;
    padding: 2rem;
    background-color: var(--primary-700); /* Dynamic background */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }

  /* Register button */
  .register-btn {
    position: absolute;
    top: 1rem;
    right: 2rem;
    padding: 0.7rem 1.2rem;
    background-color: var(--primary-500);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    transition: var(--transition);
  }

  .register-btn:hover {
    background-color: var(--primary-700);
  }

  /* Table styling */
  .table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(
      --background-secondary-color
    ); /* Dynamic background */
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-2);
    margin-top: 3rem;
  }

  .table th,
  .table td {
    text-align: left;
    padding: 1rem;
    font-size: 1rem;
    border-bottom: 1px solid var(--grey-300);
    color: var(--text-color); /* Text color for both themes */
  }

  /* Table Header */
  .table th {
    background-color: var(--primary-500);
    color: var(--white);
    font-weight: 600;
  }

  /* Table Row Hover Effect */
  .table tr {
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .table tr:hover {
    transform: scale(1.01);
    background-color: var(--primary-100);
    cursor: pointer;
  }

  /* Table Data Cells */
  .table td {
    background-color: var(--background-secondary-color);
  }

  /* User Profile Icon */
  .profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-700);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }

  /* User Row styling */
  .user-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export default Wrapper;
