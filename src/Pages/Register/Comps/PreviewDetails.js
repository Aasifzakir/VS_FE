import React from 'react'

export default function PreviewDetails({ value, onSubmit }) {
    if (!value) return null
    return (
        <>
            <div className="preview_container">
                <div className="preview_field">
                    <h6>First Name:</h6>
                    <p>{value.first_name}</p>
                </div>
                <div className="preview_field">
                    <h6>Middle Name:</h6>
                    <p>{value.middle_name}</p>
                </div>
                <div className="preview_field">
                    <h6>Last Name:</h6>
                    <p>{value.last_name}</p>
                </div>
                <div className="preview_field">
                    <h6>Address:</h6>
                    <p>{`${value.address}, ${value.state}, ${value.country}, ${value.zip_code}.`}</p>
                </div>
                <div className="col_2">
                    <div className="preview_field">
                        <h6>Email:</h6>
                        <p>{value.email}</p>
                    </div>
                    <div className="preview_field">
                        <h6>Phone Number:</h6>
                        <p>{value.phone_number}</p>
                    </div>
                </div>
                <div className="col_2">
                    <div className="preview_field">
                        <h6>Height (ft/inches):</h6>
                        <p>{value.height}</p>
                    </div>

                    <div className="preview_field">
                        <h6>Weight (kgs):</h6>
                        <p>{value.weight}</p>
                    </div>
                </div>

            </div>
            <div className="form_action_btns">
                <button
                    type='button'
                    className="primary"
                    onClick={onSubmit}
                >
                    Save
                </button>
            </div>
        </>
    )
}
