import React, { useEffect, useReducer, useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import vehicleConfigs from '../vehicleConfigs';
import Header from './Header';
import Editor from './Editor';
import Canvas from './Canvas';
import Actions from './Actions';
import VehicleTitle from './VehicleTitle';
import Chatbot from 'react-simple-chatbot';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const theme = {
    background: '#F2F2F2',
    headerBgColor: '#C8102E',
    headerFontSize: '20px',
    botBubbleColor: '#C8102E',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#000000',
    userFontColor: 'white',
};


const steps = [
  {
    id: 'Greet',
    message: 'Hello! Welcome to Car Sculptor. How can I assist you today?',
    trigger: 'AskName'
  },
  {
    id: 'AskName',
    message: 'Please type your name.',
    trigger: 'WaitingUserInputForName'
  },
  {
    id: 'WaitingUserInputForName',
    user: true,
    trigger: 'AskingOptionsToHelp'
  },
  {
    id: 'AskingOptionsToHelp',
    message: 'Hi {previousValue}, what would you like to know more about?',
    trigger: 'Options'
  },
  {
    id: 'Options',
    options: [
      { value: 'carModels', label: 'Car Models', trigger: 'CarModels' },
      { value: 'paint', label: 'Paint Options', trigger: 'Paint' },
      { value: 'lift', label: 'Lift Options', trigger: 'Lift' },
      { value: 'rims', label: 'Rims', trigger: 'Rims' },
      { value: 'tires', label: 'Tires', trigger: 'Tires' },
      { value: 'autoRotate', label: 'Auto Rotate', trigger: 'AutoRotate' }
    ]
  },
  {
    id: 'CarModels',
    message: 'We offer various car models for customization. Some of the popular models include Toyota 4Runner, Ford Explorer, and Jeep Wrangler.',
    trigger: 'Options'
  },
  {
    id: 'Paint',
    message: 'You can choose different paint finishes such as Glossy, Matte, and Satin. Each finish gives a unique look to your vehicle.',
    trigger: 'Options'
  },
  {
    id: 'Lift',
    message: 'Lift options vary from 0" to several inches. Choose the lift height that suits your off-road needs and aesthetic preferences.',
    trigger: 'Options'
  },
  {
    id: 'Rims',
    message: 'We offer a variety of rim types and colors. You can choose from standard steel rims, alloy rims, or custom-designed rims.',
    trigger: 'Options'
  },
  {
    id: 'Tires',
    message: 'Available tire options include all-terrain, off-road, and performance tires. Choose the type that fits your driving needs.',
    trigger: 'Options'
  },
  {
    id: 'AutoRotate',
    message: 'The auto-rotate feature adjusts the camera angle automatically to provide the best view of your vehicle. You can enable or disable it as per your preference.',
    trigger: 'Options'
  }
];

Modal.setAppElement('#root'); // Ensure accessibility by setting the root element for the modal

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const [savedVehicles, setSavedVehicles] = useState(() => {
    const localStorageVehicles = localStorage.getItem('savedVehicles');
    return localStorageVehicles ? JSON.parse(localStorageVehicles) : { current: null };
  });

  useEffect(() => {
    localStorage.setItem('savedVehicles', JSON.stringify(savedVehicles));
  }, [savedVehicles]);

  const defaultVehicleConfig = () => {
    const defaultVehicleId = savedVehicles.current;
    return defaultVehicleId && savedVehicles[defaultVehicleId]
      ? savedVehicles[defaultVehicleId].config
      : vehicleConfigs.defaults;
  };

  const [currentVehicle, setVehicle] = useReducer(
    (currentVehicle, newState) => ({ ...currentVehicle, ...newState }),
    defaultVehicleConfig()
  );

  const [cameraAutoRotate, setCameraAutoRotate] = useState(false);
  const [environment, setEnvironment] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedConfig = urlParams.get('config');
    if (encodedConfig) {
      const jsonString = decodeURIComponent(encodedConfig);
      const config = JSON.parse(jsonString);
      setVehicle(config);
      setSavedVehicles((prevSavedVehicles) => ({
        ...prevSavedVehicles,
        current: null,
      }));
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: 'red',
            },
          },
        }}
      >
        <Header>
          <UserButton className="custom-user-button" />
          <VehicleTitle savedVehicles={savedVehicles} setSavedVehicles={setSavedVehicles} setVehicle={setVehicle} />
        </Header>
        <Canvas currentVehicle={currentVehicle} setVehicle={setVehicle} cameraAutoRotate={cameraAutoRotate} environment={environment} />
        <Editor
          currentVehicle={currentVehicle}
          setVehicle={setVehicle}
          cameraAutoRotate={cameraAutoRotate}
          setCameraAutoRotate={setCameraAutoRotate}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <Actions
          className="action-container"
          currentVehicle={currentVehicle}
          toggleSidebar={toggleSidebar}
          savedVehicles={savedVehicles}
          setSavedVehicles={setSavedVehicles}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <div className="chatbot-container">
          <button className="chatbot-toggle" onClick={toggleChatbot}>
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
          <Modal
            isOpen={isChatbotOpen}
            onRequestClose={toggleChatbot}
            contentLabel="Chatbot"
            className="chatbot-modal"
            overlayClassName="chatbot-overlay"
          >
            <ThemeProvider theme={theme}>
            <Chatbot steps={steps} />
            </ThemeProvider>
            <button onClick={toggleChatbot} className="chatbot-close-button">Close</button>
          </Modal>
        </div>
      </SignedIn>
    </>
  );
}
