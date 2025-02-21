import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;

  h2 {
    margin: 0 0 15px 0;
    font-size: 18px;
    color: #333;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #0066cc;
      box-shadow: 0 0 0 2px rgba(0,102,204,0.2);
    }
  }



  textarea {
    min-height: 60px;
  }
`;

export const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background: #f5f5f5;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const Button = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #0052a3;
  }

  &.secondary {
    background: #6c757d;
    margin-right: 10px;

    &:hover {
      background: #5a6268;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const SectionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ButtonWithIcon = styled.button`
  display: flex;
  align-items: center;
  background-color: #f59e0b;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 180px;
  
  &:hover {
    background-color: #0052a3;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 1; /* Ensure it is above the background */
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;