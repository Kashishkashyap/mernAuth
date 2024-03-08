import React from 'react';

const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div>
            {props.alert && (
                <div className={`fixed top-0 left-0 right-0 z-50 mx-auto px-4 py-2 rounded-md ${props.alert.type === 'danger' ? 'bg-red-500' : 'bg-green-500'} text-white shadow-md`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;
