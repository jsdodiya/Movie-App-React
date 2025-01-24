import React from 'react';

const Dropdown = ({ title, options, func }) => {

  return (
    <div className="select">
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option value="0" disabled>
          {title.toUpperCase()}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}> {/* Corrected key syntax and set value dynamically */}
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
