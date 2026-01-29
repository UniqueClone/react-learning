import { useReducer } from 'react';
import './index.css';

interface PersonalData {
  name: string;
  email: string;
}

interface AddressData {
  street: string;
  city: string;
}

type AllData = PersonalData & AddressData;

const initialState = {
  step: 'personal' as const,
  data: {},
};

export default function App() {
  return (
    <div className="container">
      <h1>Multi-Step Form (State Machine)</h1>
    </div>
  );
}
