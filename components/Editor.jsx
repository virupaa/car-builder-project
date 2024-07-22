import React, { useState } from 'react';
import vehicleConfigs from '../vehicleConfigs';
import EditorSection from './EditorSection';
import VehicleIcon from '../assets/images/icons/Vehicle.svg';
import RimIcon from '../assets/images/icons/Rim.svg';
import TireIcon from '../assets/images/icons/Tire.svg';
import ToolIcon from '../assets/images/icons/Tool.svg';
import GearIcon from '../assets/images/icons/Gear.svg';
import { useCookies } from 'react-cookie';

function Editor(props) {
    const { currentVehicle = { id: null }, setVehicle, cameraAutoRotate, setCameraAutoRotate, environment, setEnvironment, isActive } = props;
    const [selectedEnvironment, setSelectedEnvironment] = useState(environment);
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
                    <select value={currentVehicle.rim_accent_color || ''} onChange={(e) => setVehicle({ rim_accent_color: e.target.value })}>
                        <option value='chrome'>Chrome</option>
                        <option value='flat_black'>Flat Black</option>
                        <option value='gloss_black'>Gloss Black</option>
                        <option value='silver'>Silver</option>
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
            </EditorSection>

            {/* Tires */}
            <EditorSection title='Tires' icon={<TireIcon className='icon' />}>
                <div className='field field-tire'>
                    <label>Type</label>
                    <GroupedSelect value={currentVehicle.tire} itemList={vehicleConfigs.wheels.tires} groupBy={'type'} onChange={(e) => setVehicle({ tire: e.target.value })} />
                </div>

                {/* Width */}
                <div className='field field-tire-width'>
                    <label>Width</label>
                    <select value={currentVehicle.tire_width || ''} onChange={(e) => setVehicle({ tire_width: e.target.value })}>
                        <option value=''>Select a width</option>
                        <option value='225'>225</option>
                        <option value='235'>235</option>
                        <option value='245'>245</option>
                        <option value='255'>255</option>
                        <option value='265'>265</option>
                        <option value='275'>275</option>
                        <option value='285'>285</option>
                        <option value='295'>295</option>
                        <option value='305'>305</option>
                        <option value='315'>315</option>
                        <option value='325'>325</option>
                        <option value='335'>335</option>
                        <option value='345'>345</option>
                        <option value='355'>355</option>
                        <option value='365'>365</option>
                        <option value='375'>375</option>
                    </select>
                </div>

                {/* Height */}
                <div className='field field-tire-height'>
                    <label>Profile</label>
                    <select value={currentVehicle.tire_height || ''} onChange={(e) => setVehicle({ tire_height: e.target.value })}>
                        <option value=''>Select a profile</option>
                        <option value='20'>20</option>
                        <option value='25'>25</option>
                        <option value='30'>30</option>
                        <option value='35'>35</option>
                        <option value='40'>40</option>
                        <option value='45'>45</option>
                        <option value='50'>50</option>
                        <option value='55'>55</option>
                        <option value='60'>60</option>
                        <option value='65'>65</option>
                        <option value='70'>70</option>
                        <option value='75'>75</option>
                        <option value='80'>80</option>
                        <option value='85'>85</option>
                    </select>
                </div>

                {/* Rim Size */}
                <div className='field field-tire-size'>
                    <label>Size</label>
                    <InchRangeSelect value={currentVehicle.tire_size} min={16} max={30} onChange={(e) => setVehicle({ tire_size: e.target.value })} />
                </div>
            </EditorSection>

            {/* Addons */}
            {addonsExist() && (
                <EditorSection title='Addons' icon={<ToolIcon className='icon' />}>
                    <div className='field field-addon'>
                        <label>Add-ons</label>
                        <div className='field-addon-buttons'>
                            {Object.keys(vehicleConfigs.vehicles[currentVehicle.id].addons).map((addon) => (
                                <button
                                    key={addon}
                                    className={currentVehicle.addons.includes(addon) ? 'active' : ''}
                                    onClick={() => {
                                        const newAddons = currentVehicle.addons.includes(addon)
                                            ? currentVehicle.addons.filter((a) => a !== addon)
                                            : [...currentVehicle.addons, addon];
                                        setVehicle({ addons: newAddons });
                                    }}
                                >
                                    {vehicleConfigs.vehicles[currentVehicle.id].addons[addon].name}
                                </button>
                            ))}
                        </div>
                    </div>
                </EditorSection>
            )}

            {/* Advanced Options */}
            <EditorSection title='Advanced Options' icon={<GearIcon className='icon' />}>
                <div className='field field-advanced'>
                    <label>Auto-Rotate</label>
                    <input
                        type="checkbox"
                        checked={cameraAutoRotate}
                        onChange={(e) => setCameraAutoRotate(e.target.checked)}
                    />
                </div>
                
            </EditorSection>
        </div>
    );
}

export default Editor;
