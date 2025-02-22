import React, { useCallback } from 'react';
import Swal from 'sweetalert2';

const Actions = ({ currentVehicle, savedVehicles, setSavedVehicles, isActive, setIsActive }) => {

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    // Save current vehicle to local storage.
    const saveVehicle = () => {
        // Get the name of the existing vehicle, if available.
        const vehicleName = savedVehicles.current ? savedVehicles[savedVehicles.current]?.name : '';

        // Prompt the user for a name for their vehicle.
        Swal.fire({
            title: 'Save Your Vehicle',
            text: 'Enter a name for your vehicle:',
            input: 'text',
            inputValue: vehicleName,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a name for your vehicle.';
                }
            }
        }).then((result) => {
            if (result.isDismissed) {
                return;
            }

            // Get submitted vehicle name.
            const name = result.value;

            // Check if we are updating an existing vehicle or saving a new one.
            // If the name has been changed, save as a new vehicle.
            const vehicleId = savedVehicles.current && name === vehicleName ? savedVehicles.current : Date.now();

            // Create an object to represent the vehicle.
            const vehicle = {
                name: name,
                config: currentVehicle,
            };

            // Save the vehicle to local storage and set current.
            const newSavedVehicles = {
                ...savedVehicles,
                current: vehicleId,
                [vehicleId]: vehicle,
            };
            setSavedVehicles(newSavedVehicles);

            // Notify the user that the vehicle has been saved.
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Your vehicle has been saved.',
                showConfirmButton: false,
                timer: 1500
            });
        });
    };

    // Share current config.
    const shareVehicle = useCallback(() => {
        // Generate shareable URL.
        const jsonString = JSON.stringify(currentVehicle);
        const encodedConfig = encodeURIComponent(jsonString);
        const shareableUrl = `${window.location.origin}?config=${encodedConfig}`;

        // Notify user with the link element and copy button.
        Swal.fire({
            title: 'Share Your Vehicle',
            text: 'Copy this link to save or share your vehicle configuration:',
            html: `<a href="${shareableUrl}" target="_blank" rel="noopener noreferrer">Shareable link</a>`,
            showCancelButton: true,
            confirmButtonText: 'Copy Link',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Copy the shareable URL to the clipboard.
                navigator.clipboard.writeText(shareableUrl)
                    .then(() => {
                        // Notify the user that the link has been copied.
                        Swal.fire({
                            icon: 'success',
                            title: 'Copied!',
                            text: 'The shareable link has been copied to your clipboard.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        // Handle error.
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred while copying the link to the clipboard.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    }, [currentVehicle]);

    // Trigger screenshot.
    const takeScreenshot = () => {
        window.dispatchEvent(new Event('takeScreenshot'));
    };

    return (
        <div id='actions'>
            <button onClick={saveVehicle}>Save</button>
            <button onClick={shareVehicle}>Share</button>
            <button onClick={takeScreenshot}>Screenshot</button>
            <button onClick={toggleSidebar}>{isActive ? 'Hide Sidebar' : 'Show Sidebar'}</button>
        </div>
    );
};

export default Actions;
