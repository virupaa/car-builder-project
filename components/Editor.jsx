import React, { useState } from 'react';
import vehicleConfigs from '../vehicleConfigs';
import EditorSection from './EditorSection';
import VehicleIcon from '../assets/images/icons/Vehicle.svg';
import RimIcon from '../assets/images/icons/Rim.svg';
import TireIcon from '../assets/images/icons/Tire.svg';
import ToolIcon from '../assets/images/icons/Tool.svg';
import GearIcon from '../assets/images/icons/Gear.svg';
import Actions from './Actions';
import { useCookies } from 'react-cookie';

function Editor(props) {
    const { currentVehicle = { id: null }, setVehicle, cameraAutoRotate, setCameraAutoRotate, environment, setEnvironment } = props;
    const [selectedEnvironment, setSelectedEnvironment] = useState(environment);
    const [isActive, setIsActive] = useState(true);
    const [cookies, setCookie] = useCookies(['environment']);

   
    const addonsExist = () => currentVehicle.id && Object.keys(vehicleConfigs.vehicles[currentVehicle.id].addons).length > 0;

    const handleEnvironmentChange = (event) => {
        const selectedEnvironment = event.target.value;
        
        setCookie('environment', selectedEnvironment, { path: '/' }); // Set the cookie with the new environment value
    };


    const groupObjectByKey = (object, key) => {
        const groups = {};
        for (const id of Object.keys(object)) {
            const type = object[id][key];
            if (!groups[type]) groups[type] = [];
            groups[type].push(id);
        }
        return groups;
    };

    const GroupedSelect = ({ value, itemList, groupBy, ...restProps }) => {
        const groupedList = groupObjectByKey(itemList, groupBy);
        return (
            <select value={value || ''} {...restProps}>
                {Object.keys(groupedList).map((type) => (
                    <optgroup key={type} label={type}>
                        {groupedList[type].map((id) => (
                            <option key={id} value={id}>
                                {itemList[id].name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        );
    };

    const InchRangeSelect = ({ value, min, max, ...restProps }) => {
        let elements = [];
        for (let i = min; i <= max; i++) {
            elements.push(
                <option key={i} value={i}>
                    {i}"
                </option>
            );
        }
        return (
            <select value={value || 0} {...restProps}>
                {elements}
            </select>
        );
    };

    return (
        <div id='editor' className={isActive ? 'visible' : ''}>
            {/* Vehicle */}
            <EditorSection title='Vehicle' icon={<VehicleIcon className='icon' />} defaultActive={true}>
                {/* Vehicle */}
                <div className='field field-vehicle'>
                    <label>Model</label>
                    <GroupedSelect value={currentVehicle.id} itemList={vehicleConfigs.vehicles} groupBy={'make'} onChange={(e) => setVehicle({ id: e.target.value })} />
                </div>

                {/* Paint */}
                <div className='field field-paint'>
                    <div className='field field-vehicle-color'>
                        <label>Paint</label>
                        <input type='color' value={currentVehicle.color || ''} onChange={(e) => setVehicle({ color: e.target.value })} />
                    </div>

                    {/* Roughness */}
                    <div className='field field-vehicle-roughness'>
                        <label>Finish</label>
                        <select value={currentVehicle.roughness || 0} onChange={(e) => setVehicle({ roughness: e.target.value })}>
                            <option value='0.8'>Flat</option>
                            <option value='0.7'>Eggshell</option>
                            <option value='0.5'>Satin</option>
                            <option value='0.3'>Pearl</option>
                            <option value='0.1'>Gloss</option>
                            <option value='0.9'>Ultra Matte</option>
                            <option value='0.4'>Silk</option>
                        </select>
                    </div>
                </div>

                {/* Vehicle Lift */}
                <div className='field field-vehicle-lift'>
                    <label>Lift</label>
                    <InchRangeSelect value={currentVehicle.lift} min={-2} max={13} onChange={(e) => setVehicle({ lift: e.target.value })} />
                </div>

                {/* Wheel Offset */}
                <div className='field field-wheel-offset'>
                    <label>Offset</label>
                    <input
                        type="range"
                        min="0"
                        max="0.1"
                        step="0.01"
                        value={currentVehicle.wheel_offset || 0}
                        onChange={(e) => setVehicle({ wheel_offset: e.target.value })}
                        style={{
                            width: '100%',
                            height: '15px',
                            appearance: 'none',
                            background: 'linear-gradient(to right, #ccc, #ccc)',
                            outline: 'none',
                            opacity: '0.7',
                            transition: 'opacity .15s ease-in-out',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
            </EditorSection>

            {/* Rims */}
            <EditorSection title='Rims' icon={<RimIcon className='icon' />}>
                <div className='field field-rim'>
                    <label>Type</label>
                    <GroupedSelect value={currentVehicle.rim} itemList={vehicleConfigs.wheels.rims} groupBy={'make'} onChange={(e) => setVehicle({ rim: e.target.value })} />
                </div>

                {/* Primary Rim Color */}
                <div className='field field-rim-color'>
                    <label>Color</label>
                    <select value={currentVehicle.rim_color || ''} onChange={(e) => setVehicle({ rim_color: e.target.value })}>
                        <option value='flat_black'>Flat Black</option>
                        <option value='gloss_black'>Gloss Black</option>
                        <option value='silver'>Silver</option>
                        <option value='chrome'>Chrome</option>
                        <option value='body'>Body match</option>
                        <option value='matte_grey'>Matte Grey</option>
                        <option value='brushed_aluminum'>Brushed Aluminum</option>
                        <option value='gunmetal'>Gunmetal</option>
                        <option value='bronze'>Bronze</option>
                        <option value='gold'>Gold</option>
                        <option value='blue'>Blue</option>
                        <option value='red'>Red</option>
                        <option value='white'>White</option>
                    </select>
                </div>

                {/* Secondary Rim Color */}
                <div className='field field-rim-color'>
                    <label>Accent</label>
                    <select value={currentVehicle.rim_color_secondary || ''} onChange={(e) => setVehicle({ rim_color_secondary: e.target.value })}>
                        <option value='flat_black'>Flat Black</option>
                        <option value='gloss_black'>Gloss Black</option>
                        <option value='silver'>Silver</option>
                        <option value='chrome'>Chrome</option>
                        <option value='body'>Body match</option>
                    </select>
                </div>

                {/* Rim Size */}
                <div className='field field-rim-size'>
                    <div className='field field-rim-diameter'>
                        <label>Diameter</label>
                        <InchRangeSelect value={currentVehicle.rim_diameter} min={14} max={24} onChange={(e) => setVehicle({ rim_diameter: e.target.value })} />
                    </div>

                    <div className='field field-rim-width'>
                        <label>Width</label>
                        <InchRangeSelect value={currentVehicle.rim_width} min={8} max={16} onChange={(e) => setVehicle({ rim_width: e.target.value })} />
                    </div>
                </div>
            </EditorSection>

            {/* Tires */}
            <EditorSection title='Tires' icon={<TireIcon className='icon' />}>
                <div className='field field-tire-type'>
                    <div className='field field-tire-type'>
                        <label>Type</label>
                        <GroupedSelect value={currentVehicle.tire} itemList={vehicleConfigs.wheels.tires} groupBy={'make'} onChange={(e) => setVehicle({ tire: e.target.value })} />
                    </div>

                    <div className='field field-tire-size'>
                        <label>Size</label>
                        <InchRangeSelect value={currentVehicle.tire_diameter} min={30} max={40} onChange={(e) => setVehicle({ tire_diameter: e.target.value })} />
                    </div>
                </div>
            </EditorSection>

            {addonsExist() && (
                <EditorSection title='Addons' icon={<ToolIcon className='icon' />}>
                    {Object.keys(vehicleConfigs.vehicles[currentVehicle.id].addons).map((addon) => (
                        <div key={addon} className={`field field-${addon}`}>
                            <label>{vehicleConfigs.vehicles[currentVehicle.id].addons[addon].name}</label>
                            <select value={currentVehicle.addons[addon]} required onChange={(e) => setVehicle({ addons: { ...currentVehicle.addons, [addon]: e.target.value } })}>
                                {!vehicleConfigs.vehicles[currentVehicle.id].addons[addon].required && <option value=''>None</option>}
                                {Object.keys(vehicleConfigs.vehicles[currentVehicle.id].addons[addon].options).map((option) => (
                                    <option key={option} value={option}>
                                        {vehicleConfigs.vehicles[currentVehicle.id].addons[addon].options[option].name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </EditorSection>
            )}

            {/* Environment Settings */}
            <EditorSection title='Environment' icon={<GearIcon className='icon' />}>
                <div className='field field-environment'>
                    <label>HDR Environment</label>
                    <select value={environment} onChange={handleEnvironmentChange}>
                        <option value='/assets/images/ground/skylit_garage_8k.hdr'>Skylit Garage</option>
                        <option value='/assets/images/ground/garage_8k.hdr'>Venice Sunset</option>
                    </select>
                </div>
            </EditorSection>

            {/* Scene */}
            <EditorSection title='Options' icon={<GearIcon className='icon' />}>
                <div className='field field-camera-autorotate'>
                    <input type='checkbox' id='camera-autorotate' checked={cameraAutoRotate} onChange={(e) => setCameraAutoRotate(e.target.checked)} />
                    <label htmlFor='camera-autorotate'>Auto Rotate</label>
                </div>
            </EditorSection>
        
        </div>
    );
}

export default Editor;
